
const Comments = ({comment}) =>(
    <>
        <h3>Comments:</h3>
        {
            comment.map((comment,index) =>(
            <div key={index} className = 'comment'>
            <h4>{comment.email}</h4>
            <p>{comment.text}</p>
            </div>
            ))
        }
    </>
)
    
export default Comments;