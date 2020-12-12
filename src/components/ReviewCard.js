import React, { useState } from "react";

const ReviewCard = ({ author, content }) => {
    return (
        <div style={{ "backgroundColor": "#e6e6e6", padding: "10px", borderRadius: "5px", marginBottom: 10 }}>
            <p style={{ fontSize: "1.2em", fontWeight: "bold" }}>{content}</p>
            <p style={{ fontStyle: "italic", color: "gray" }}>{`Posted by @${author}`}</p>
        </div>
    );
}

export default ReviewCard;