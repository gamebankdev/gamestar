import styled from "styled-components";
import React from "react";
import CommentList from "../components/gamesCommentList";
import Editor from "../components/Editor";
import { connect } from "dva";
import { message, Pagination, Alert } from "antd";
import formtTime from "../utils/formatTime";
const Container = styled.div`
  width: 100%;
  min-height: calc(100% - 280px);
  background: #fff;
  padding-top: 20px;
  box-sizing: border-box;
`;
const ContentContainer = styled.div`
  width: 980px;
  margin: 0 auto;
`;
const GameTop = styled.div`
  display: flex;
  justify-content: space-between;
  color: #333333;
  font-family: "SimHei";
  font-size: 16px;
  padding-bottom: 20px;
  box-sizing: border-box;
`;
const GameTitle = styled.div`
  display: inherit;
`;
const GameLog = styled.div`
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const GameCate = styled.div`
  padding-left: 20px;
  box-sizing: border-box;
  p {
    padding: 0;
    margin: 0;
    font-size: 20px;
    padding-bottom: 30px;
    box-sizing: border-box;
  }
`;
const Game_content = styled.div`
  width: 100%;
  background-color: #f8f8f8;
`;
const Game_comment_componnt = styled.div`
  width: 100%;
  padding-left: 20px;
  border-bottom: 2px solid #333;
  box-sizing: border-box;
`;
const Comment_counts = styled.p`
  font-family: "SimHei";
  color: #333;
  font-size: 20px;
  padding: 30px 0;
  box-sizing: border-box;
  span {
    font-size: 16px;
    padding-left: 20px;
    box-sizing: border-box;
  }
`;
const Game_comments = styled.div`
  padding: 20px 0;
  box-sizing: border-box;
`;
const LastcommentsTitle = styled.p`
  font-family: "SimHei";
  font-size: 20px;
  color: #333;
  margin: 0;
  padding: 0;
`;
const PaginationContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  box-sizing: border-box;
`;

class Deatail extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getDetail(id);
  }
  //发帖
  post(payload) {
    //   验证是否登陆
    /*
        wif 私钥,parentAuthor 父作者，
        parentPermlink 父文章 ,author 发帖作者,
        title标题,body 内容，jsonMetadata：tag 帖子id
     */
    //   wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata
    const { privePostingWif, userName } = this.props.loginUserMeta;
    if (!privePostingWif) {
      return message.warning("请先登陆");
    }
    const { gameName } = this.props.gamesDetail;
    const { id } = this.props.match.params;
    const {content,image}=payload
    this.props.postComment([
      privePostingWif,
      "",
      id,
      userName,
      new Date().getTime().toString(),
      new Date().getTime().toString(),
      content,
      { tags: [id, gameName],image }
    ]);
  }
  changePagination = (page, pageSize) => {
    if (page == 1) {
      return this.props.getCommentIndex();
    }
    const start_author = this.props.gamesComment.discussion_idx[1].created[9].split(
      "/"
    )[0];
    const start_permlink = this.props.gamesComment.discussion_idx[1].created[9].split(
      "/"
    )[1];
    this.props.getComment(start_author, start_permlink);
  };
  render() {
    const {
      introduce,
      created_at,
      logo,
      gameName,
      tag
    } = this.props.gamesDetail;
    const { id } = this.props.match.params;
    const { privePostingWif, userName } = this.props.loginUserMeta;
    const {
      total_posts,
      tonewCommentArray,
      accounts
    } = this.props.gamesComment;
    return (
      <Container>
        <ContentContainer>
          <div>
            <GameTop>
              <GameTitle>
                <GameLog>
                  <img src={logo} alt="" />
                </GameLog>
                <GameCate>
                  <p>{gameName}</p>
                  {tag
                    ? JSON.parse(tag).map((item, index) => {
                        return (
                          <span style={{ marginRight: "10px" }} key={index}>
                            {item}
                          </span>
                        );
                      })
                    : null}
                </GameCate>
              </GameTitle>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <span> {formtTime(created_at)} </span>
              </div>
            </GameTop>
            <Game_content dangerouslySetInnerHTML={{ __html: introduce }} />
            <Game_comment_componnt>
              <Comment_counts>
                玩家评论
                <span>
                  (已有
                  {total_posts}
                  条评论)
                </span>
              </Comment_counts>
              <Editor
                {...{
                  show: true,
                  replay: "posts",
                  postComemnt: payload => this.post(payload)
                }}
                key={id}
              />
            </Game_comment_componnt>
          </div>
          <Game_comments>
            <LastcommentsTitle>最新评论</LastcommentsTitle>
            {tonewCommentArray.length > 0 ? (
              tonewCommentArray.map((item, index) => {
                var obj = {
                  ...item,
                  gameId: id,
                  privePostingWif,
                  userName
                };
                return (
                  <CommentList key={index} accounts={accounts} props={obj} />
                );
              })
            ) : (
              <Alert
                message="暂无评论"
                style={{ textAlign: "center" }}
                type="info"
              />
            )}
          </Game_comments>
          <PaginationContainer>
            <Pagination
              showQuickJumper={false}
              defaultCurrent={1}
              defaultPageSize={10}
              hideOnSinglePage={true}
              onChange={this.changePagination}
              total={total_posts}
            />
          </PaginationContainer>
        </ContentContainer>
      </Container>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { ...state.users, ...state.games };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    postComment: payload => {
      return new Promise((resolve, reject) => {
        dispatch({
          type: "posts/PostComment",
          payload
        })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getDetail: gameId => {
      dispatch({
        type: "games/getGameDeatil",
        gameId
      });
    },
    getComment: (author, permlink) => {
      dispatch({
        type: "games/getGameCommentMore",
        start_permlink: permlink,
        start_author: author,
        gameId: ownProps.match.params.id
      });
    },
    getCommentIndex: () => {
      dispatch({
        type: "games/getGameComment",
        gameId: ownProps.match.params.id
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deatail);
