import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/storage";
import { SET_AUTHENTICATED } from "../redux/types";
import axios from "axios";

export const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    const file = new File(formData, image.name);
    const extension = file.name.slice(file.name.lastIndexOf(".") + 1);

    const imageFileName = `${Math.round(
        Math.random() * 100000000000
    )}.${extension}`;

    const storageRef = firebase.storage().ref().child(imageFileName);

    storageRef.put(file).then((snapshot) => {
        console.log(snapshot);
    });
};

export const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
};
