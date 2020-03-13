import {
  SET_USER_INFO,
  SET_LOGIN_STATE,
  SET_TOKEN
} from './mutation-types';
import {
  login,
  logout
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'

const user = {
  //全局状态
  state: {
    token: getToken(),
    userInfo: {},
    isLogin: false,
  },

  getters: {
    getUserAvatar(state) {
      if (state.isLogin && state.userInfo.icon != undefined) {
        return state.userInfo.icon;
      } else {
        return "/static/images/default.jpg"
      }
    }
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOGIN_STATE: (state, isLogin) => {
      state.isLogin = isLogin
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },

  actions: {
    //登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(resp => {
          const token = resp.data.tokenHead + resp.data.token;
          setToken(token);
          commit('SET_TOKEN', token);
          commit('SET_USER_INFO', resp.data.userInfo);
          commit('SET_LOGIN_STATE', true);
          resolve(resp)
        }).catch(error => {
          reject(error);
        })
      })
    },

    //登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },

  }
}

export default user

