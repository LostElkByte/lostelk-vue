import { axios } from '../service/service';
import { createStore } from 'vuex';
const CancelToken = axios.CancelToken;
let cancel = null as unknown;

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

export interface GloabSearchProps {
  searchName: string;
  totalCount: number;
}

export interface GloablDataProps {
  loading: boolean;
  error: GloablErrorProps;
  cardList: CardList[];
  searchCardList: CardList[];
  userPhotosCardList: CardList[];
  userLikeCardList: CardList[];
  card: CardList | {};
  user: GloablUserProps;
  token: string;
  userLikes: CardList[];
  isShowLoading: boolean;
  searchFailure: boolean;
  searchVal: GloabSearchProps | {};
  mainSearchIsNone: boolean;
  fileMetadata: GloablfileMetadataProps | {};
  showCommentsCut: boolean;
  homePageCardTotalCount: number | 0;
  searchPageCardTotalCount: number | 0;
  userPhotosCardTotalCount: number | 0;
  userLikeCardTotalCount: number | 0;
  uploadAfterToUrl: string | null;
  fromWhichPage: string | null;
  isShowLoadingMore: boolean;
  noMore: boolean;
  isLoading: boolean;
  againRequest: boolean;
  isLoadingVeryGoods: boolean;
  veryGoodsTransverseList: CardList[];
  veryGoodsLongitudinalList: CardList[];
}

export default createStore<GloablDataProps>({
  state: {
    loading: false,
    error: { status: false },
    cardList: [],
    searchCardList: [],
    userPhotosCardList: [],
    userLikeCardList: [],
    card: {},
    user: { isLogin: false, id: Number(localStorage.getItem('userId')) || -1 },
    token: localStorage.getItem('token') || '',
    userLikes: [],
    isShowLoading: true,
    searchFailure: false,
    mainSearchIsNone: true,
    fileMetadata: {},
    showCommentsCut: false,
    searchVal: {},
    homePageCardTotalCount: 0,
    searchPageCardTotalCount: 0,
    userPhotosCardTotalCount: 0,
    userLikeCardTotalCount: 0,
    uploadAfterToUrl: null,
    fromWhichPage: null,
    isShowLoadingMore: false,
    noMore: false,
    isLoading: true,
    againRequest: false,
    isLoadingVeryGoods: true,
    veryGoodsTransverseList: [],
    veryGoodsLongitudinalList: []
  },

  mutations: {
    /**
     * 修改是否进行加载精选图
     */
    alterIsLoadingVeryGoods(state, rawData) {
      state.isLoadingVeryGoods = rawData;
    },

    /**
     * 添加精选图
     * 横图/纵图
     */
    getVeryGoodsTransverseList(state, rawData) {
      state.veryGoodsTransverseList = rawData;
    },
    getVeryGoodsLongitudinalList(state, rawData) {
      state.veryGoodsLongitudinalList = rawData;
    },

    /**
     * 重新请求
     */
    againRequest(state, rawData) {
      state.againRequest = rawData;
    },
    /**
     * 登陆
     */
    login(state, rawData) {
      state.token = rawData.token;
      localStorage.setItem('token', rawData.token);
      localStorage.setItem('userId', rawData.id);
      axios.defaults.headers.common.Authorization = `Bearer ${rawData.token}`;
    },

    /**
     * 获取当前用户信息
     */
    getCurrentUser(state, rawData) {
      state.user = {
        isLogin: true,
        ...rawData.data
      };
    },

    /**
     * 退出登陆
     */
    logout(state) {
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      delete axios.defaults.headers.common.Authorization;
      state.user = {
        isLogin: false,
        id: -1
      };
      state.userLikes = [];
    },

    /**
     * 获得卡片列表
     */
    getCardList(state, rawdata) {
      state.cardList = rawdata;
    },

    /**
     * 添加卡片列表
     */
    getPageCardList(state, rawdata) {
      state.cardList.push(...rawdata);
    },

    /**
     * 获取主页卡片总数
     */
    getHomePageCardTotalCount(state, rawdata) {
      state.homePageCardTotalCount = rawdata;
    },

    /**
     * 删除主页中的某一项后的卡片总数
     */
    deteleHomePageCardTotalCount(state, rawdata) {
      state.homePageCardTotalCount = rawdata - 1;
    },

    /**
     * 或得单个卡片
     */
    cardData(state, rawdata) {
      state.card = rawdata;
    },

    /**
     * 获得指定搜索内容的卡片内容
     */
    getSearchValCardList(state, rawdata) {
      state.searchCardList = rawdata;
    },

    /**
     * 添加指定搜索内容的卡片内容
     */
    getPageSearchValCardList(state, rawdata) {
      state.searchCardList.push(...rawdata);
    },

    /**
     * 获得指定搜索内容的卡片总数
     */
    getSearchValPageCardTotalCount(state, rawdata) {
      state.searchPageCardTotalCount = rawdata;
    },

    /**
     * 删除指定搜索内容中的某一项后的卡片总数
     */
    deteleSearchValPageCardTotalCount(state, rawdata) {
      state.searchPageCardTotalCount = rawdata - 1;
    },

    /**
     * 获取指定用户发表的内容列表
     */
    getUserPhotosCardList(state, rawdata) {
      state.userPhotosCardList = rawdata;
    },

    /**
     * 添加指定用户发表的卡片列表
     */
    getPageUserPhotosCardList(state, rawdata) {
      state.userPhotosCardList.push(...rawdata);
    },

    /**
     * 获取指定用户发表的内容的数量
     */
    getUserPhotosCardTotalCount(state, rawdata) {
      state.userPhotosCardTotalCount = rawdata;
    },

    /**
     * 获取指定用户喜欢的内容列表
     */
    getUserLikeCardList(state, rawdata) {
      state.userLikeCardList = rawdata;
    },

    /**
     * 获取指定用户喜欢的内容的数量
     */
    getUserLikeCardTotalCount(state, rawdata) {
      state.userLikeCardTotalCount = rawdata;
    },

    /**
     * 添加指定用户喜欢的内容列表
     */
    getPageUserLikeCardList(state, rawdata) {
      state.userLikeCardList.push(...rawdata);
    },
    /**
     * loading
     */
    setLoading(state, status) {
      state.loading = status;
    },

    /**
     * 全局错误
     */
    setError(state, e: GloablErrorProps) {
      state.error = e;
    },

    /**
     * 当前登陆用户点赞过的内容列表
     */
    getUserLikes(state, rawdata) {
      state.userLikes = rawdata;
    },

    /**
     * 修改isShowLoading状态
     */
    setIsShowLoading(state, rawdata) {
      state.isShowLoading = rawdata;
    },

    /**
     * 修改mainSearchIsNone显示状态
     */
    mainSearchIsNone(state, rawdata) {
      state.mainSearchIsNone = rawdata;
    },

    /**
     * 修改搜索结果
     */
    setSearchFailure(state, rawdata) {
      state.searchFailure = rawdata;
    },

    /**
     * 传入搜索内容
     */
    setSearchVal(state, rawdata) {
      state.searchVal = rawdata;
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
      for (let i = 0; i < state.searchCardList.length; i++) {
        if (state.searchCardList[i].id === postId) {
          state.searchCardList[i].liked = 1;
          state.searchCardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.userPhotosCardList.length; i++) {
        if (state.userPhotosCardList[i].id === postId) {
          state.userPhotosCardList[i].liked = 1;
          state.userPhotosCardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.userLikeCardList.length; i++) {
        if (state.userLikeCardList[i].id === postId) {
          state.userLikeCardList[i].liked = 1;
          state.userLikeCardList[i].totalLikes++;
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
      for (let i = 0; i < state.searchCardList.length; i++) {
        if (state.searchCardList[i].id === postId) {
          state.searchCardList[i].liked = 0;
          state.searchCardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.userPhotosCardList.length; i++) {
        if (state.userPhotosCardList[i].id === postId) {
          state.userPhotosCardList[i].liked = 0;
          state.userPhotosCardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.userLikeCardList.length; i++) {
        if (state.userLikeCardList[i].id === postId) {
          state.userLikeCardList[i].liked = 0;
          state.userLikeCardList[i].totalLikes--;
          break;
        }
      }
    },

    /**
     * 监听实时点赞 修改卡片的like的值
     */
    realTimeClickLike(state, postId) {
      for (let i = 0; i < state.cardList.length; i++) {
        if (state.cardList[i].id === postId) {
          state.cardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.searchCardList.length; i++) {
        if (state.searchCardList[i].id === postId) {
          state.searchCardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.userPhotosCardList.length; i++) {
        if (state.userPhotosCardList[i].id === postId) {
          state.userPhotosCardList[i].totalLikes++;
          break;
        }
      }
      for (let i = 0; i < state.userLikeCardList.length; i++) {
        if (state.userLikeCardList[i].id === postId) {
          state.userLikeCardList[i].totalLikes++;
          break;
        }
      }
    },

    /**
     * 实时取消点赞 修改卡片的like值
     */
    realTimeCancelLike(state, postId) {
      for (let i = 0; i < state.cardList.length; i++) {
        if (state.cardList[i].id === postId) {
          state.cardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.searchCardList.length; i++) {
        if (state.searchCardList[i].id === postId) {
          state.searchCardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.userPhotosCardList.length; i++) {
        if (state.userPhotosCardList[i].id === postId) {
          state.userPhotosCardList[i].totalLikes--;
          break;
        }
      }
      for (let i = 0; i < state.userLikeCardList.length; i++) {
        if (state.userLikeCardList[i].id === postId) {
          state.userLikeCardList[i].totalLikes--;
          break;
        }
      }
    },

    /**
     * 获取当前图像文件的元数据
     */
    fileMetadata(state, rawdata) {
      state.fileMetadata = rawdata;
    },

    /**
     * 切换评论列表显示隐藏
     */
    showCommentsCut(state, rawdata) {
      state.showCommentsCut = rawdata;
    },

    /**
     * 获取 uploadPicture 是从哪个url进入的
     */
    uploadAfterToUrl(state, rawdata) {
      state.uploadAfterToUrl = rawdata;
    },

    /**
     * fromWhichPage
     * 获取是从那个页面进来的
     */
    fromWhichPage(state, rawdata) {
      state.fromWhichPage = rawdata;
    },

    /**
     * 设置 是否显示 加载更多提示
     */
    isShowLoadingMore(state, rawdata) {
      state.isShowLoadingMore = rawdata;
    },

    /**
     * 设置是否显示 没有更多 提示
     */
    noMore(state, rawdata) {
      state.noMore = rawdata;
    }
  },

  actions: {
    /**
     * 登陆
     */
    async login(context, userLoginData) {
      try {
        const loginData = await axios.post('/login', userLoginData);
        context.commit('login', loginData.data);
        return loginData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取当前用户信息
     */
    async getCurrentUser(context, currentUserId) {
      try {
        const currentUserData = await axios.get(`/users/${currentUserId}`);
        context.commit('getCurrentUser', currentUserData);
        return currentUserData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 登陆 + 获取当前用户信息的组合
     */
    loginAndGetCurrentUser(context, userLoginData) {
      return context.dispatch('login', userLoginData).then(data => {
        if (data) {
          return context.dispatch('getCurrentUser', data.data.id);
        }
      });
    },

    /**
     * 修改当前登陆用户的用户名
     */
    async patchUserName(context, newUserNameObject) {
      try {
        await axios.patch('/users', newUserNameObject);
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获得卡片列表
     */
    async getCardList(context) {
      try {
        const CardListData = await axios.get('/posts');
        context.commit('getCardList', CardListData.data);
        context.commit(
          'getHomePageCardTotalCount',
          CardListData.headers['x-total-count']
        );
        return CardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 卡片列表分页加载
     */
    async getPageCardList(context, page) {
      try {
        const CardListData = await axios.get(`/posts?page=${page}`);
        context.commit('getPageCardList', CardListData.data);
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取指定用户发表的内容列表
     */
    async getUserPhotosCardList(context, userId) {
      try {
        const userPhotosCardListData = await axios.get(
          `/posts?user=${userId}&action=published`
        );
        context.commit('getUserPhotosCardList', userPhotosCardListData.data);
        context.commit(
          'getUserPhotosCardTotalCount',
          userPhotosCardListData.headers['x-total-count']
        );
        return userPhotosCardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取指定用户发表的内容分页列表
     */
    async getPageUserPhotosCardList(context, { userId, page }) {
      try {
        const userPhotosCardListData = await axios.get(
          `/posts?user=${userId}&action=published&page=${page}`
        );
        context.commit(
          'getPageUserPhotosCardList',
          userPhotosCardListData.data
        );
        context.commit(
          'getUserPhotosCardTotalCount',
          userPhotosCardListData.headers['x-total-count']
        );
        return userPhotosCardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取指定用户喜欢的内容列表
     */
    async getUserLikeCardList(context, userId) {
      try {
        const userLikeCardList = await axios.get(
          `/posts?user=${userId}&action=liked`
        );
        context.commit('getUserLikeCardList', userLikeCardList.data);
        context.commit(
          'getUserLikeCardTotalCount',
          userLikeCardList.headers['x-total-count']
        );
        return userLikeCardList;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取指定用户喜欢的内容分页列表
     */
    async getPageUserLikeCardList(context, { userId, page }) {
      try {
        const userLikeCardListData = await axios.get(
          `/posts?user=${userId}&action=liked&page=${page}`
        );
        context.commit('getPageUserLikeCardList', userLikeCardListData.data);
        context.commit(
          'getUserLikeCardTotalCount',
          userLikeCardListData.headers['x-total-count']
        );
        return userLikeCardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获得单个卡片内容
     */
    async getCard(context, postId) {
      try {
        const cardData = await axios.get(`/posts/${postId}`);
        context.commit('cardData', cardData.data);
        return cardData.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获得指定搜索内容的卡片列表
     */
    async getSearchValCardList(context, { val, type }) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let searchCardListData: any;
        switch (type) {
          case 'tag':
            searchCardListData = await axios.get(`/posts?fuzzyTag=${val}`);
            break;
          case 'color':
            searchCardListData = await axios.get(`/posts?color=${val}`);
            break;
          default:
            break;
        }

        context.commit('getSearchValCardList', searchCardListData.data);
        context.commit(
          'getSearchValPageCardTotalCount',
          searchCardListData.headers['x-total-count']
        );
        context.commit('setSearchVal', {
          searchName: val,
          totalCount: searchCardListData.headers['x-total-count']
        });
        return searchCardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获得指定搜索内容的卡片列表分页
     */
    async getPageSearchValCardList(context, { val, type, page }) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let searchCardListData: any;
        switch (type) {
          case 'tag':
            searchCardListData = await axios.get(
              `/posts?fuzzyTag=${val}&page=${page}`
            );
            break;
          case 'color':
            searchCardListData = await axios.get(
              `/posts?color=${val}&page=${page}`
            );
            break;
          default:
            break;
        }

        context.commit('getPageSearchValCardList', searchCardListData.data);
        return searchCardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获得当前登陆用户赞过的内容列表
     */
    async getUserLikes(context, userId) {
      try {
        if (context.state.user.isLogin) {
          const userLikes = await axios.get(
            `/posts?user=${userId}&action=liked`
          );
          context.commit('getUserLikes', userLikes.data);
        }
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取当前文件的元数据信息
     */
    async getFileMetadata(context, fileId) {
      try {
        const fileMetadata = await axios.get(`/files/${fileId}/metadata`);
        context.commit('fileMetadata', fileMetadata.data);
        return fileMetadata.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取当前内容的评论列表
     */
    async getComments(context, postId) {
      try {
        const comments = await axios.get(`/comments?post=${postId}`);
        return comments;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取当前的评论的回复评论列表
     */
    async getReplyComments(context, commentId) {
      try {
        const comments = await axios.get(`/comments/${commentId}/replies`);
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 发表评论
     */
    async publishComments(context, publishCommentData) {
      try {
        const comments = await axios.post(`/comments`, publishCommentData);
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 回复评论
     */
    async publishReplyComment(context, { commentId, publishReplyCommentData }) {
      try {
        const comments = await axios.post(
          `/comments/${commentId}/reply`,
          publishReplyCommentData
        );
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 修改评论
     */
    async reviseComment(context, { commentId, reviseCommentData }) {
      try {
        const comments = await axios.patch(
          `/comments/${commentId}`,
          reviseCommentData
        );
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 修改回复评论
     */
    async reviseReplyComment(context, { commentId, reviseCommentData }) {
      try {
        const comments = await axios.patch(
          `/reply_comment/${commentId}`,
          reviseCommentData
        );
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 删除评论
     */
    async deleteComment(context, commentId) {
      try {
        const comments = await axios.delete(`/comments/${commentId}`);
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 删除回复评论
     */
    async deleteReplyComment(context, commentId) {
      try {
        const comments = await axios.delete(`/reply_comment/${commentId}`);
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 删除卡片
     */
    async deleteCard(context, postId) {
      try {
        const comments = await axios.delete(`/posts/${postId}`);
        return comments.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 请求上传内容标签
     */
    async createTag(context, { postId, tag }) {
      try {
        await axios.post(`/posts/${postId}/tag`, { name: `${tag}` });
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 删除内容标签
     */
    async deleteTag(context, { postId, tagId }) {
      try {
        await axios.delete(`/posts/${postId}/tag`, {
          data: { tagId: `${tagId}` }
        });
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取精选横图
     */
    async getVeryGoodsTransverseList(context, tagName) {
      try {
        const veryGoodsTransverseData = await axios.get(
          `/posts?tag=${tagName}`
        );
        context.commit(
          'getVeryGoodsTransverseList',
          veryGoodsTransverseData.data
        );
        return veryGoodsTransverseData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 获取精选横图
     */
    async getVeryGoodsLongitudinalList(context, tagName) {
      try {
        const getVeryGoodsLongitudinalData = await axios.get(
          `/posts?tag=${tagName}`
        );
        context.commit(
          'getVeryGoodsLongitudinalList',
          getVeryGoodsLongitudinalData.data
        );
        return getVeryGoodsLongitudinalData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 注册 - 激活账户
     */
    async registerActivation(context, { email, name, registrationVerifyKey }) {
      try {
        const res = await axios.get(
          `/activat_email?email=${email}&name=${name}&registration_verify_key=${registrationVerifyKey}`
        );
        return res.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 找回密码 - 发送邮件
     */
    async sendRetrievePassword(context, email) {
      try {
        const res = await axios.post(`/send_retrieve_password_verify_key`, {
          email: email
        });
        return res.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 找回密码 - 修改密码
     */
    async retrievePassword(context, data) {
      try {
        const res = await axios.patch(`/retrieve_password`, data);
        return res.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 搜索相关帖子总数
     */
    async searchPostTotal(context, { type, name }) {
      try {
        const res = await axios.get(`/search/Total?${type}=${name}`);
        return res.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 搜索相关用户总数
     */
    async searchUserTotal(context, name) {
      try {
        const res = await axios.get(`/search/user/Total?name=${name}`);
        return res.data;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 展示出指定搜索内容的简要列表
     */
    async getSearchValCardBriefList(context, { val, type }) {
      try {
        if (typeof cancel === 'function') {
          cancel();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let searchCardListData: any;
        switch (type) {
          case 'tag':
            searchCardListData = await axios.get(`/posts?fuzzyTag=${val}`, {
              cancelToken: new CancelToken(function executor(c) {
                cancel = c;
              })
            });
            break;
          case 'color':
            searchCardListData = await axios.get(`/posts?color=${val}`, {
              cancelToken: new CancelToken(function executor(c) {
                cancel = c;
              })
            });
            break;
          case 'user':
            searchCardListData = await axios.get(`/search/users?name=${val}`, {
              cancelToken: new CancelToken(function executor(c) {
                cancel = c;
              })
            });
            break;
          default:
            break;
        }
        return searchCardListData;
      } catch (error) {
        throw `${error}`;
      }
    },

    /**
     * 搜索用户分页列表
     */
    async getPageSearchValUsersList(context, { val, page }) {
      try {
        const searchUserListData = await axios.get(
          `/search/users?name=${val}&page=${page}`
        );
        return searchUserListData;
      } catch (error) {
        throw `${error}`;
      }
    }
  },

  getters: {},

  modules: {}
});
