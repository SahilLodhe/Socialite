import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc,collection } from "firebase/firestore" // addDoc is to add a record in the firebase database, and collection is to specify the collection to which we want to add data
import { auth, db } from "../../config/firebase" // database import
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
// interface CreateFormData { // only for typescript
//     title: string;
//     description: string;
// }
export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth); // user will contain the useAuthState object from the firebase, and it will be used by the name of "user"
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    })
    const {register, handleSubmit, formState:{ errors }, } = useForm({
        resolver: yupResolver(schema),

    });
    const postsRef = collection(db,"posts") // refers to the collection "posts"
    const onCreatePost = (data) => { // "data" is the data which will be recieved from the user
        console.log(data);
        addDoc(postsRef, {
            title:data.title,
            description:data.description,
            username:user?.displayName,
            id:user?.uid

            // or we can just add all the data from the existing data variable instead of creating a new one, and then add the new attributes to the old data
            // ...data
            // username:user?.displayName,
            // id:user?.uid


        }) // postRef is the reference of the collection to which we want to add data to
        navigate("/");
    }
    return (
        <form onSubmit={handleSubmit(onCreatePost)} action="">
            <input placeholder="Title..." {...register("title")} />
            <p style={{color:"red"}}>{errors.title?.message}</p> {/* put that "?" mandatorily */}
            <textarea placeholder="Description..." {...register("description")}/>
            <p style={{color: "red"}}>{errors.description?.message}</p> {/* put that "?" mandatorily */}
            <input type="submit" className="submitForm" />
        </form>
    )
}