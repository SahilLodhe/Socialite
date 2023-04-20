import {
    addDoc,
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import { useAuthState } from "react-firebase-hooks/auth";
  import { db, auth } from "../../config/firebase";
  import { Post as IPost } from "./main";
  import { CreateComment } from "../create-comment/create-comment"
  
  // export interface Props {
  //   post: IPost;
  // }
  
  // interface Like {
  //   likeId: string;
  //   userId: string;
  // }

  // export interface Comment {
  //   postID: string;
  // }

  // interface CommentPostID {
  //   postID: string;
  // }
  
  export const Post = (props) => {
    const { post } = props;
    // const [postID,setPostID] = useState<CommentPostID>({postID: post.id});
    
    // useEffect((likesDoc) => {

    // },[])
    // useEffect(() => {

    // },[])
    // useEffect(() => {

    // },[])
    const [user] = useAuthState(auth);
  
    const [likes, setLikes] = useState(null);
  
    const likesRef = collection(db, "likes");
  
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    useEffect(() => {
      const likesDoc = query(likesRef, where("postId", "==", post.id));
    },[post.id,likesRef])
    const getLikes = async () => {
      const data = await getDocs(likesDoc);
      setLikes(
        data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
      );
    };
    const addLike = async () => {
      try {
        const newDoc = await addDoc(likesRef, {
          userId: user?.uid,
          postId: post.id,
        });
        if (user) {
          setLikes((prev) =>
            prev
              ? [...prev, { userId: user.uid, likeId: newDoc.id }]
              : [{ userId: user.uid, likeId: newDoc.id }]
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const removeLike = async () => {
      try {
        const likeToDeleteQuery = query(
          likesRef,
          where("postId", "==", post.id),
          where("userId", "==", user?.uid)
        );
  
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeId = likeToDeleteData.docs[0].id;
        const likeToDelete = doc(db, "likes", likeId);
        await deleteDoc(likeToDelete);
        if (user) {
          setLikes(
            (prev) => prev && prev.filter((like) => like.likeId !== likeId)
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);
  
    useEffect(() => {
      const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(
          data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
        );
      }
      getLikes();
    }, [getLikes,likesDoc]);
    
    return (
      <div>
        <div className="title">
          <h1> {post.title}</h1>
        </div>
        <div className="body">
          <p> {post.description} </p>
        </div>
  
        <div className="footer">
          <p> @{post.username} </p>
          <button onClick={hasUserLiked ? removeLike : addLike}>
            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}{" "}
          </button>
          {likes && <p> Likes: {likes?.length} </p>}
          <button> Comment
            {/* < CreateComment postIDprop={postID}/> */}
          </button>
        </div>
      </div>
    );
  };