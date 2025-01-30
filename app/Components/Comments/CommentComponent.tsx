"use client";
import { useEffect, useState } from "react";
import commentStyles from "./commentsCss/comments.module.css";
import mobileStyle from "../MobileComponents/MobileHomepage/Css/mobileHomepage.module.css";

import CommentDetails from "./CommentDetails";
import {
  ClientCommentsDetailedI,
  fetchClientCommentsDetailed,
} from "@/app/libs/Queries/FetchFunction/fetchClientComments";

const CommentComponent = ({ post, color }: { post: string; color: string }) => {
  const [theComments, setComments] = useState<ClientCommentsDetailedI | null>(
    null
  );
  const [showComments, setShowComments] = useState(false);

  //console.log(comments);

  useEffect(() => {
    if (showComments) {
      const getData = async () => {
        if (post) {
          const data = await fetchClientCommentsDetailed(post);
          setComments(data);
        }
      };
      getData();
    }
  }, [post, showComments]);

  if (!showComments) {
    return (
      <div style={{ marginTop: "30px" }}>
        <button
          className={mobileStyle.mobileButton}
          onClick={() => setShowComments(true)}
        >
          Prikaži komentare
        </button>
      </div>
    );
  }

  if (theComments?.comments === undefined) {
    return;
  }

  if (theComments?.comments?.nodes?.length < 1) {
    return (
      <div className={`${commentStyles.commentsContainer}`}>
        <h3 style={{ color: "white", marginTop: "30px" }}>
          Komentari: {theComments?.comments?.nodes?.length}
        </h3>
      </div>
    );
  }
  return (
    <>
      {showComments && (
        <div
          className={commentStyles.commentsContainer}
          style={{ marginTop: "40px", color: color }}
        >
          <h2>Komentari : {theComments?.comments?.nodes?.length}</h2>
          {theComments?.comments?.nodes?.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            theComments?.comments?.nodes.map((item: any, idx: number) => {
              return <CommentDetails key={idx} item={item} />;
            })}
        </div>
      )}
    </>
  );
};

export default CommentComponent;
