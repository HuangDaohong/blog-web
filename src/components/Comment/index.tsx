// import * as React from 'react';
// import { useRequest, useSafeState, useBoolean } from 'ahooks';
// import * as mainApi from '@/api';
// import LocaleTime from '@/utils/LocaleTime';
// import { Avatar, Button, Divider, Input, message, Modal, notification, Skeleton } from 'antd';
// import * as Icon from '@ant-design/icons';
// import Emoji from '@/components/Emoji';
// import styles from './index.module.less';
// import { useSelector } from 'react-redux';
// import { GetRootState } from '@/redux';
// import { IComment } from '@/types';
// import InfiniteScroll from 'react-infinite-scroll-component';

// interface Props {
//   loading?: boolean;
//   articleID?: number;
//   ip?: string;
//   city?: string;
// }
// const CommentCom: React.FC<Props> = props => {
//   console.log('CommentCom', props);
//   const [commentReply, setCommentReply] = useSafeState<string>('');
//   const [replyContent, setReplyContent] = useSafeState<string>('');
//   const [showReply, { toggle: toggleReply, setTrue: openReply, setFalse: closeReply }] = useBoolean(false);
//   const [showId, setShowId] = useSafeState<number>();
//   const [page, setPage] = useSafeState(1);
//   const pagesize = 4;
//   const [commentist, setCommentlist] = useSafeState(Array<IComment>);
//   const [total, setTotal] = useSafeState<number>();

//   const { user } = useSelector((state: GetRootState) => state.account);
//   const { data, run, refresh } = useRequest(
//     () => mainApi.commentService.find({ id: props.articleID, pageNum: page, pageSize: pagesize }),
//     {
//       manual: true,
//       // retryCount: 3,
//       onSuccess: ({ data }) => {
//         setTotal(data?.total);
//         // setCommentlist(data?.list);
//         setCommentlist(commentist.concat(data?.list));
//         setPage(prev => prev + 1);
//       }
//     }
//   );
//   const isMore = total && commentist.length < total;
//   const addContent = (value: any) => {
//     setReplyContent(replyContent + value);
//   };
//   const addCommentReply = (value: any) => {
//     setCommentReply(commentReply + value);
//   };

//   // 子评论提交
//   const submit = async (parentID: number, repliID) => {
//     console.log(replyContent, props.articleID, parentID, repliID);
//     await mainApi.commentService.create({
//       article_id: props.articleID,
//       parent_comment_id: parentID,
//       comment_equipment: props.ip + props.city,
//       reply_comment_id: repliID,
//       content: replyContent
//     });
//     setReplyContent('');
//     closeReply();
//     refresh();
//   };
//   // 主评论提交
//   const submitComment = async () => {
//     if (commentReply.trim() === '') {
//       message.error('评论不能为空');
//       return;
//     }
//     console.log(commentReply);
//     await mainApi.commentService.create({
//       article_id: props.articleID,
//       content: commentReply,
//       comment_equipment: props.ip + props.city
//     });
//     setCommentReply('');
//     refresh();
//   };

//   const removeComment = async (id: number) => {
//     await mainApi.commentService.remove(id);
//     notification.success({ message: '删除评论成功' });
//     refresh();
//   };
//   const loading = () => (
//     <div className="loading">
//       <Skeleton active />
//     </div>
//   );

//   React.useEffect(() => {
//     run();
//   }, [props.articleID]);

//   return (
//     <div className={styles.container}>
//       {/* {props.loading}文章id为{props.articleID}共有{data?.data.total}组评论 */}
//       <span className={styles.commenttitle}>
//         <Icon.CommentOutlined />
//         &nbsp;评论&nbsp;({data?.data?.total})
//       </span>
//       <div className={styles.commentEdit}>
//         <Input.TextArea
//           // rows={6}
//           autoSize={{ minRows: 6, maxRows: 6 }}
//           placeholder="留下点什么吧..."
//           value={commentReply}
//           onChange={e => setCommentReply(e.target.value)}
//           required
//           bordered={false}
//           maxLength={400}
//           // showCount
//         />
//         <div className={styles.commentEditBottonm}>
//           <Emoji addContent={addCommentReply} />
//           <div>
//             {/*             <Button type="primary" danger onClick={() => setReplyContent('')}>
//               取消
//             </Button>
//             &emsp; */}
//             <Button type="primary" onClick={submitComment}>
//               提交
//             </Button>
//           </div>
//         </div>
//       </div>
//       <InfiniteScroll
//         dataLength={commentist.length}
//         next={run}
//         key={1}
//         hasMore={isMore}
//         loader={loading()}
//         endMessage={
//           <Divider plain className="more">
//             END
//           </Divider>
//         }
//       >
//         {commentist.map(item => (
//           <div key={item.id}>
//             <div className={styles.father}>
//               <Avatar src={item?.tb_user?.avatar} size={48} />
//               <span className={styles.username}>{item?.tb_user?.name}</span>
//               {item?.tb_user?.id === 1 ? <span className={styles.admin}>作者</span> : null}
//               {item?.tb_user?.id !== 1 ? (
//                 <span className={styles.ipaddress}>{item.comment_equipment}</span>
//               ) : null}
//               <div className={styles.content}>
//                 <span className={styles.replycontent}>{item?.content}</span>
//               </div>
//               <div className={styles.timeAndReply}>
//                 <LocaleTime date={item.createdAt!} />
//                 <Button
//                   type="link"
//                   onClick={() => {
//                     if (showId === item.id) {
//                       toggleReply();
//                     } else {
//                       openReply();
//                     }
//                     setShowId(item.id);
//                     setReplyContent('');
//                   }}
//                 >
//                   回复
//                 </Button>
//                 {user?.id === 1 ? (
//                   <Button
//                     type="link"
//                     danger
//                     onClick={() => {
//                       Modal.confirm({
//                         title: '此操作将永久的删除该评论(包括子评论)，是否继续❓',
//                         icon: <Icon.QuestionCircleOutlined />,
//                         okText: '确认',
//                         cancelText: '取消',
//                         centered: true,
//                         onOk: () => {
//                           removeComment(item.id!);
//                         }
//                       });
//                     }}
//                   >
//                     删除
//                   </Button>
//                 ) : null}
//               </div>
//               {showReply && item.id === showId ? (
//                 <div className={styles.commentEdit}>
//                   <Input.TextArea
//                     // rows={6}
//                     autoSize={{ minRows: 6, maxRows: 6 }}
//                     placeholder={`回复 @${item?.tb_user?.name}  :`}
//                     value={replyContent}
//                     onChange={e => setReplyContent(e.target.value)}
//                     required
//                     bordered={false}
//                     maxLength={400}
//                     // showCount
//                   />
//                   <div className={styles.commentEditBottonm}>
//                     <Emoji addContent={addContent} />
//                     <div>
//                       <Button
//                         type="primary"
//                         danger
//                         onClick={() => {
//                           closeReply(), setReplyContent('');
//                         }}
//                       >
//                         取消
//                       </Button>
//                       &nbsp;
//                       <Button type="primary" onClick={() => submit(item?.id, item?.id)}>
//                         提交
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//             <div>
//               {item.children
//                 ? item.children.map(child => (
//                     <div key={child.id} className={styles.child}>
//                       <Avatar src={child?.tb_user?.avatar} size={24} />
//                       <span className={styles.childusername}>{child?.tb_user?.name}</span>
//                       {child?.tb_user?.id === 1 ? <span className={styles.admin}>作者</span> : null}
//                       {child?.tb_user?.id !== 1 ? (
//                         <span className={styles.ipaddress}>{child.comment_equipment}</span>
//                       ) : null}

//                       <div className={styles.content}>
//                         <span className={styles.replyname}>@{child?.replyComment?.tb_user?.name}&nbsp;</span>
//                         <span className={styles.replycontent}>{child?.content}</span>
//                       </div>
//                       <div className={styles.chilid_timeAndReply}>
//                         <LocaleTime date={child.createdAt!} />

//                         <Button
//                           type="link"
//                           onClick={() => {
//                             if (showId === child.id) {
//                               toggleReply();
//                             } else {
//                               openReply();
//                             }
//                             setShowId(child.id);
//                             setReplyContent('');
//                           }}
//                         >
//                           回复
//                         </Button>
//                         {user?.id === 1 ? (
//                           <Button
//                             type="link"
//                             danger
//                             onClick={() => {
//                               Modal.confirm({
//                                 title: '此操作将永久的删除该评论(包括子评论)，是否继续❓',
//                                 icon: <Icon.QuestionCircleOutlined />,
//                                 okText: '确认',
//                                 cancelText: '取消',
//                                 centered: true,
//                                 onOk: () => {
//                                   removeComment(item.id!);
//                                 }
//                               });
//                             }}
//                           >
//                             删除
//                           </Button>
//                         ) : null}
//                         {showReply && child.id === showId ? (
//                           <div className={styles.commentEdit}>
//                             <Input.TextArea
//                               // rows={6}
//                               autoSize={{ minRows: 6, maxRows: 6 }}
//                               placeholder={`回复 @${child?.tb_user?.name}  :`}
//                               value={replyContent}
//                               onChange={e => setReplyContent(e.target.value)}
//                               required
//                               bordered={false}
//                               maxLength={400}
//                               // showCount
//                             />
//                             <div className={styles.commentEditBottonm}>
//                               <Emoji addContent={addContent} />
//                               <div>
//                                 <Button
//                                   type="primary"
//                                   danger
//                                   onClick={() => {
//                                     closeReply(), setReplyContent('');
//                                   }}
//                                 >
//                                   取消
//                                 </Button>
//                                 &nbsp;
//                                 <Button type="primary" onClick={() => submit(item.id, child.id)}>
//                                   提交
//                                 </Button>
//                               </div>
//                             </div>
//                           </div>
//                         ) : null}
//                       </div>
//                     </div>
//                   ))
//                 : null}
//             </div>
//             <Divider />
//           </div>
//         ))}
//       </InfiniteScroll>
//       {/* <div className={styles.pageBox}>
//         <Pagination
//           current={page}
//           hideOnSinglePage
//           total={total}
//           defaultPageSize={pagesize}
//           showTitle={false}
//           onChange={(page: number) => {
//             setPage(page);
//             console.log(page);
//             // window.scrollTo(0, 440);
//           }}
//         />
//       </div> */}
//     </div>
//   );
// };

// export default CommentCom;
import * as React from 'react';
import { useRequest, useSafeState, useBoolean } from 'ahooks';
import * as mainApi from '@/api';
import LocaleTime from '@/utils/LocaleTime';
import { Avatar, Button, Divider, Input, message, Modal, notification, Pagination } from 'antd';
import * as Icon from '@ant-design/icons';
import Emoji from '@/components/Emoji';
import styles from './index.module.less';
import { useSelector } from 'react-redux';
import { GetRootState } from '@/redux';
import { IComment } from '@/types';
interface Props {
  loading?: boolean;
  articleID?: number;
  ip?: string;
  city?: string;
}
const CommentCom: React.FC<Props> = props => {
  const [commentReply, setCommentReply] = useSafeState<string>('');
  const [replyContent, setReplyContent] = useSafeState<string>('');
  const [showReply, { toggle: toggleReply, setTrue: openReply, setFalse: closeReply }] = useBoolean(false);
  const [showId, setShowId] = useSafeState<number>();
  const [page, setPage] = useSafeState(1);
  const pagesize = 10;
  const [commentist, setCommentlist] = useSafeState(Array<IComment>);
  const [total, setTotal] = useSafeState<number>();

  const { user } = useSelector((state: GetRootState) => state.account);
  const { data, run, refresh } = useRequest(
    () => mainApi.commentService.find({ id: props.articleID, pageNum: page, pageSize: pagesize }),
    {
      manual: true,
      retryCount: 3,
      onSuccess: ({ data }) => {
        setTotal(data?.total);
        setCommentlist(data?.list);
      }
    }
  );
  const addContent = (value: any) => {
    setReplyContent(replyContent + value);
  };
  const addCommentReply = (value: any) => {
    setCommentReply(commentReply + value);
  };

  // 子评论提交
  const submit = async (parentID: number, repliID) => {
    console.log(replyContent, props.articleID, parentID, repliID);
    await mainApi.commentService.create({
      article_id: props.articleID,
      parent_comment_id: parentID,
      comment_equipment: props.ip + props.city,
      reply_comment_id: repliID,
      content: replyContent
    });
    setReplyContent('');
    closeReply();
    refresh();
  };
  // 主评论提交
  const submitComment = async () => {
    if (commentReply.trim() === '') {
      message.error('评论不能为空');
      return;
    }
    console.log(commentReply);
    await mainApi.commentService.create({
      article_id: props.articleID,
      content: commentReply,
      comment_equipment: props.ip + props.city
    });
    setCommentReply('');
    refresh();
  };

  const removeComment = async (id: number) => {
    await mainApi.commentService.remove(id);
    notification.success({ message: '删除评论成功' });
    refresh();
  };

  React.useEffect(() => {
    run();
  }, [props.articleID, page]);

  return (
    <div className={styles.container}>
      {/* {props.loading}文章id为{props.articleID}共有{data?.data.total}组评论 */}
      <span className={styles.commenttitle}>
        <Icon.CommentOutlined />
        &nbsp;评论&nbsp;({data?.data?.total})
      </span>
      <div className={styles.commentEdit}>
        <Input.TextArea
          // rows={6}
          autoSize={{ minRows: 6, maxRows: 6 }}
          placeholder="留下点什么吧..."
          value={commentReply}
          onChange={e => setCommentReply(e.target.value)}
          required
          bordered={false}
          maxLength={400}
          // showCount
        />
        <div className={styles.commentEditBottonm}>
          <Emoji addContent={addCommentReply} />
          <div>
            {/*             <Button type="primary" danger onClick={() => setReplyContent('')}>
              取消
            </Button>
            &emsp; */}
            <Button type="primary" onClick={submitComment}>
              提交
            </Button>
          </div>
        </div>
      </div>
      {commentist.map(item => (
        <div key={item.id}>
          <div className={styles.father}>
            <Avatar src={item?.tb_user?.avatar} size={48} />
            <span className={styles.username}>{item?.tb_user?.name}</span>
            {item?.tb_user?.id === 1 ? <span className={styles.admin}>作者</span> : null}
            {item?.tb_user?.id !== 1 ? (
              <span className={styles.ipaddress}>{item.comment_equipment}</span>
            ) : null}
            <div className={styles.content}>
              <span className={styles.replycontent}>{item?.content}</span>
            </div>
            <div className={styles.timeAndReply}>
              <LocaleTime date={item.createdAt!} />
              <Button
                type="link"
                onClick={() => {
                  if (showId === item.id) {
                    toggleReply();
                  } else {
                    openReply();
                  }
                  setShowId(item.id);
                  setReplyContent('');
                }}
              >
                回复
              </Button>
              {user?.id === 1 ? (
                <Button
                  type="link"
                  danger
                  onClick={() => {
                    Modal.confirm({
                      title: '此操作将永久的删除该评论(包括子评论)，是否继续❓',
                      icon: <Icon.QuestionCircleOutlined />,
                      okText: '确认',
                      cancelText: '取消',
                      centered: true,
                      onOk: () => {
                        removeComment(item.id!);
                      }
                    });
                  }}
                >
                  删除
                </Button>
              ) : null}
            </div>
            {showReply && item.id === showId ? (
              <div className={styles.commentEdit}>
                <Input.TextArea
                  // rows={6}
                  autoSize={{ minRows: 6, maxRows: 6 }}
                  placeholder={`回复 @${item?.tb_user?.name}  :`}
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  required
                  bordered={false}
                  maxLength={400}
                  // showCount
                />
                <div className={styles.commentEditBottonm}>
                  <Emoji addContent={addContent} />
                  <div>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        closeReply(), setReplyContent('');
                      }}
                    >
                      取消
                    </Button>
                    &nbsp;
                    <Button type="primary" onClick={() => submit(item?.id, item?.id)}>
                      提交
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            {item.children
              ? item.children.map(child => (
                  <div key={child.id} className={styles.child}>
                    <Avatar src={child?.tb_user?.avatar} size={24} />
                    <span className={styles.childusername}>{child?.tb_user?.name}</span>
                    {child?.tb_user?.id === 1 ? <span className={styles.admin}>作者</span> : null}
                    {child?.tb_user?.id !== 1 ? (
                      <span className={styles.ipaddress}>{child.comment_equipment}</span>
                    ) : null}

                    <div className={styles.content}>
                      <span className={styles.replyname}>@{child?.replyComment?.tb_user?.name}&nbsp;</span>
                      <span className={styles.replycontent}>{child?.content}</span>
                    </div>
                    <div className={styles.chilid_timeAndReply}>
                      <LocaleTime date={child.createdAt!} />

                      <Button
                        type="link"
                        onClick={() => {
                          if (showId === child.id) {
                            toggleReply();
                          } else {
                            openReply();
                          }
                          setShowId(child.id);
                          setReplyContent('');
                        }}
                      >
                        回复
                      </Button>
                      {user?.id === 1 ? (
                        <Button
                          type="link"
                          danger
                          onClick={() => {
                            Modal.confirm({
                              title: '此操作将永久的删除该评论(包括子评论)，是否继续❓',
                              icon: <Icon.QuestionCircleOutlined />,
                              okText: '确认',
                              cancelText: '取消',
                              centered: true,
                              onOk: () => {
                                removeComment(item.id!);
                              }
                            });
                          }}
                        >
                          删除
                        </Button>
                      ) : null}
                      {showReply && child.id === showId ? (
                        <div className={styles.commentEdit}>
                          <Input.TextArea
                            // rows={6}
                            autoSize={{ minRows: 6, maxRows: 6 }}
                            placeholder={`回复 @${child?.tb_user?.name}  :`}
                            value={replyContent}
                            onChange={e => setReplyContent(e.target.value)}
                            required
                            bordered={false}
                            maxLength={400}
                            // showCount
                          />
                          <div className={styles.commentEditBottonm}>
                            <Emoji addContent={addContent} />
                            <div>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  closeReply(), setReplyContent('');
                                }}
                              >
                                取消
                              </Button>
                              &nbsp;
                              <Button type="primary" onClick={() => submit(item.id, child.id)}>
                                提交
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <Divider />
        </div>
      ))}
      <div className={styles.pageBox}>
        <Pagination
          current={page}
          hideOnSinglePage
          total={total}
          defaultPageSize={pagesize}
          showTitle={false}
          onChange={(page: number) => {
            setPage(page);
            console.log(page);
            // window.scrollTo(0, 440);
          }}
        />
      </div>
    </div>
  );
};

export default CommentCom;
