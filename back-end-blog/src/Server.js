import express, { json } from 'express';
import {db,connectDB} from './bd-connection.js'
import fs from 'fs';
import admin from 'firebase-admin';
import cors from 'cors'


const  credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
    credential:admin.credential.cert(credentials),
})

const app = express();
app.use(cors())

app.use(express.json())

app.use(async (req,res,next)=>{
    const {authtoken} = req.headers;
    console.log('authtoken',authtoken);
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken,true);
            console.log(req.user);
        } catch(e){
            console.log('err',e.message);
            return res.sendStatus(400);
        }
    req.user = req.user || {};  //check if req.user exists or send {} if it's null
    }
    next();
});

app.get('/api/articles/:name',async (req,res)=>{
    const {name} = req.params;
    const { uid } = req.user; //user id
    
    const articles = await db.collection('articles').findOne({name}); //db.articles.findOne 
    if(articles){
        const upvoteIds = articles.upvoteIds || [];
        articles.canUpvote = (uid && !upvoteIds.includes(uid));
        res.status(200).send(articles);
        
    } else {
        res.status(400).send(`${name} not found, please enter valid url!!`)
    }
    
})

app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote',async (req,res)=>{
    const {name} = req.params;
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({name});

    if(article){
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = uid && !upvoteIds.includes(uid);
        if(canUpvote){
            await db.collection('articles').updateOne({ name }, {
                $inc: { upvotes: 1 },
                $push:{upvoteIds: uid}
        })
    }

        const updatedArticle = await db.collection('articles').findOne({ name });
        res.json(updatedArticle);
    } else {
        res.status(400).send('Bad request')
    }
})

app.post('/api/articles/:name/comments',async (req,res)=>{
    const {name} = req.params;
    const {text} = req.body;
    const { email } = req.user;
    await db.collection('articles').updateOne({name},{$push : {commments:{email,text}}});
    const article = await db.collection('articles').findOne({name});
    if(article){
        res.json(article);
    } else {
        res.status(400).send('Bad request')
    }
})

connectDB(() => {
    console.log("Conneted to database....");
    app.listen(8000,()=>{
    console.log('Listening at port 8000...')
})
})
