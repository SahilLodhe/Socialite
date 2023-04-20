import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc,collection } from "firebase/firestore" // addDoc is to add a record in the firebase database, and collection is to specify the collection to which we want to add data
import { auth, db } from "../../config/firebase" // database import
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
// import { Comment } from "../main/post"
// interface CreateFormData {
//     body:string;
// }

export const CreateCommentForm = (props) => {
    return (
        <div>

        </div>
    )
}