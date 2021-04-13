import { axios } from '../service/service'
import { createStore } from 'vuex'

export interface CardList {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    name: string;
    avatar?: number;
    url?: string;
  };
  totalComments: number;
  file: {
    id?: number;
    width: number;
    height: number;
    fakeUrl?: string;
  };
  tags?: unknown;
  totalLikes: number;
  liked: number;
}

export interface GloablUserProps {
  isLogin: boolean;
  id?: number;
  name?: string;
  avatar?: number;
}

export interface GloablErrorProps {
  status: boolean;
  message?: string;
}

export interface GloablfileMetadataProps {
  id: number;
  size: number;
  width: number;
  height: number;
  metadata: {};
}

export interface GloablDataProps {
  loading: boolean;
  error: GloablErrorProps;
  cardList: CardList[];
  card: CardList | {};
  user: GloablUserProps;
  token: string;
  userLikes: CardList[];
  isShowLoading: boolean;
  searchFailure: boolean;
  mainSearchIsNone: boolean;
  HomeScrollTop: number | null;
  fileMetadata: GloablfileMetadataProps | {};
  showCommentsCut: boolean;
}

export default createStore<GloablDataProps>({

  state: {
    loading: false,
    error: { status: false },
    cardList: [],
    card: {},
    user: { isLogin: false, id: Number(localStorage.getItem('userId')) || -1 },
    token: localStorage.getItem('token') || '',
    userLikes: [],
    isShowLoading: true,
    searchFailure: false,
    mainSearchIsNone: true,
    HomeScrollTop: null,
    fileMetadata: {},
    showCommentsCut: false
  },

  mutations: {
    /**
     * 登陆
     */
    login(state, rawData) {
      state.token = rawData.token
      localStorage.setItem('token', rawData.token)
      localStorage.setItem('userId', rawData.id)
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.token}`
    },

    /**
     * 获取当前用户信息
     */
    getCurrentUser(state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      }
    },

    /**
     * 退出登陆
     */
    logout(state) {
      state.token = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      delete axios.defaults.headers.common.Authorization
      state.user = {
        isLogin: false,
        id: -1
      }
      state.userLikes = []
    },

    /**
     * 获得卡片列表
     */
    getCardList(state, rawdata) {
      state.cardList = rawdata
    },

    /**
     * 或得单个卡片
     */
    cardData(state, rawdata) {
      state.card = rawdata
    },

    /**
     * loading
     */
    setLoading(state, status) {
      state.loading = status
    },

    /**
     * 全局错误
     */
    setError(state, e: GloablErrorProps) {
      state.error = e
    },

    /**
     * 当前登陆用户点赞过的内容列表
     */
    getUserLikes(state, rawdata) {
      state.userLikes = rawdata
    },

    /**
     * 修改isShowLoading状态
     */
    setIsShowLoading(state, rawdata) {
      state.isShowLoading = rawdata
    },

    /**
     * 修改mainSearchIsNone显示状态
     */
    mainSearchIsNone(state, rawdata) {
      state.mainSearchIsNone = rawdata
    },

    /**
     * 修改搜索结果
     */
    setSearchFailure(state, rawdata) {
      state.searchFailure = rawdata
    },

    /**
     * 点赞 修改卡片的like状态与值
     */
    clickLike(state, postId) {
      for (let i = 0; i < state.cardList.length; i++) {
        if (state.cardList[i].id === postId) {
          state.cardList[i].liked = 1;
          state.cardList[i].totalLikes++;
          break;
        }
      }
    },
    /**
    * 取消点赞 修改卡片的like状态与值
    */
    cancelLike(state, postId) {
      for (let i = 0; i < state.cardList.length; i++) {
        if (state.cardList[i].id === postId) {
          state.cardList[i].liked = 0;
          state.cardList[i].totalLikes--;
          break;
        }
      }
    },

    /**
     * 获取home页滚动位置
     */
    HomeScrollTop(state, scrollTop) {
      state.HomeScrollTop = scrollTop
    },

    /**
     * 获取当前图像文件的元数据
     */
    fileMetadata(state, rawdata) {
      state.fileMetadata = rawdata
    },

    /**
     * 切换评论列表显示隐藏
     */
    showCommentsCut(state, rawdata) {
      state.showCommentsCut = rawdata
    }
  },

  actions: {

    /**
     * 登陆
     */
    async login(context, userLoginData) {
      try {
        const loginData = await axios.post('/login', userLoginData)
        context.commit('login', loginData.data)
        return loginData
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 获取当前用户信息
    */
    async getCurrentUser(context, currentUserId) {
      try {
        const currentUserData = await axios.get(`/users/${currentUserId}`)
        context.commit('getCurrentUser', currentUserData)
        return currentUserData
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 登陆 + 获取当前用户信息的组合
     */
    loginAndGetCurrentUser(context, userLoginData) {
      return context.dispatch('login', userLoginData).then(data => {
        if (data) {
          return context.dispatch('getCurrentUser', data.data.id)
        }
      })
    },

    /**
    * 获得卡片列表
    */
    async getCardList(context) {
      try {
        const CardListData = await axios.get('/posts')
        context.commit('getCardList', CardListData.data)
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获得单个卡片内容
     */
    async getCard(context, postId) {
      try {
        const cardData = await axios.get(`/posts/${postId}`)
        context.commit('cardData', cardData.data)
        return cardData.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 获得指定标签的卡片列表
     */
    async getTagCardList(context, tag) {
      try {
        const TagCardListData = await axios.get(`/posts?tag=${tag}`)
        context.commit('getCardList', TagCardListData.data);
        return TagCardListData.data
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获得当前登陆用户赞过的内容列表
     */
    async getUserLikes(context, userId) {
      try {
        if (context.state.user.isLogin) {
          const userLikes = await axios.get(`/posts?user=${userId}&action=liked`)
          context.commit('getUserLikes', userLikes.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取当前文件的元数据信息
     */
    async getFileMetadata(context, fileId) {
      try {
        const fileMetadata = await axios.get(`/files/${fileId}/metadata`)
        context.commit('fileMetadata', fileMetadata.data)
        return fileMetadata.data
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * 获取当前内容的评论列表
     */
    async getComments(context, postId) {
      try {
        const comments = await axios.get(`/comments?post=${postId}`)
        return comments
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 获取当前的评论的回复评论列表
     */
    async getReplyComments(context, commentId) {
      try {
        const comments = await axios.get(`/comments/${commentId}/replies`)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 发表评论
     */
    async publishComments(context, publishCommentData) {
      try {
        const comments = await axios.post(`/comments`, publishCommentData)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 回复评论
    */
    async publishReplyComment(context, { commentId, publishReplyCommentData }) {
      try {
        const comments = await axios.post(`/comments/${commentId}/reply`, publishReplyCommentData)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 修改评论
     */
    async reviseComment(context, { commentId, reviseCommentData }) {
      try {
        const comments = await axios.patch(`/comments/${commentId}`, reviseCommentData)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 删除评论
     */
    async deleteComment(context, commentId) {
      try {
        const comments = await axios.delete(`/comments/${commentId}`)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
     * 删除卡片
     */
    async deleteCard(context, postId) {
      try {
        const comments = await axios.delete(`/posts/${postId}`)
        return comments.data
      } catch (error) {
        console.log(error)
      }
    },

    /**
    * 请求上传内容标签
    */
    async createTag(context, { postId, tag }) {
      try {
        await axios.post(`/posts/${postId}/tag`, { name: `${tag}` });
      } catch (error) {
        console.log(error);
      }
    },

    /**
    * 删除内容标签
    */
    async deleteTag(context, { postId, tagId }) {
      try {
        await axios.delete(`/posts/${postId}/tag`, { data: { tagId: `${tagId}` } });
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {

  },

  modules: {
  }
})
