import { CreateCommentForm } from "./create-comments-form"
// import { Comment } from "../main/post"
// import { Props } from "../main/post"
// import { Props } from "../main/post"
export const CreateComment = (props) => {
    return (
        <div className="create-comment">
            <CreateCommentForm postID={props} />
        </div>
    )
}

// export {}