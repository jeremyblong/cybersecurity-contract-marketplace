import React from "react";

const bookmarkCourse = (data, index) => {
    console.log("bookmarkCourse ran/clicked - :", data, index);
}
const likeThisCourse = (data, index) => {
    console.log("likeThisCourse ran/clicked - :", data, index);
}
const dislikeThisCourse = (data, index) => {
    console.log("dislikeThisCourse ran/clicked - :", data, index);
}
const openBookmarkPopover = (data, index, setBookmarkPopoverState) => {
    setBookmarkPopoverState(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: true
        }
    });
}
const closeBookmarkPopover = (data, index, setBookmarkPopoverState) => {
    setBookmarkPopoverState(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: false
        }
    });
}
const openLikePopover = (data, index, setLikePopoverState) => {
    setLikePopoverState(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: true
        }
    });
}
const closeLikePopover = (data, index, setLikePopoverState) => {
    setLikePopoverState(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: false
        }
    });
}
const openDislikePopover = (data, index, setDislikePopoverState) => {
    setDislikePopoverState(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: true
        }
    });
}
const closeDislikePopover = (data, index, setDislikePopoverState) => {
    setDislikePopoverState(prevState => {
        return {
            ...prevState,
            [`popover${index}`]: false
        }
    });
}

export default {
    closeDislikePopover,
    openDislikePopover,
    closeLikePopover,
    openLikePopover,
    closeBookmarkPopover,
    openBookmarkPopover,
    bookmarkCourse, 
    dislikeThisCourse, 
    likeThisCourse
};