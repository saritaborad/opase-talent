export const ApiBaseUrl = Number(process.env.REACT_APP_LIVE) === 1 ? process.env.REACT_APP_LIVE_BASE_URL : process.env.REACT_APP_LOCAL_BASE_URL;
export const WebsiteUrl = Number(process.env.REACT_APP_LIVE) === 3 ? process.env.REACT_APP_LIVE_MAIN_URL : process.env.REACT_APP_LOCAL_MAIN_URL;
export const webUrl = process.env.LIVE_URL;

export const API_Path = {
  dashboardData: ApiBaseUrl + "user/talent-dashboard",
  login: ApiBaseUrl + "user/login",
  changePassword: ApiBaseUrl + "user/changepass",
  GetAllVideo: ApiBaseUrl + "home/video",
  addVideo: ApiBaseUrl + "home/uploadvideo",
  GetAllRequest: ApiBaseUrl + "home/request-get",
  AddRequestDetails: ApiBaseUrl + "home/request-details",
  GetAllReview: ApiBaseUrl + "home/get-review",
  GetAllSocial: ApiBaseUrl + "user/socialmedia",

  GetAllProfile: ApiBaseUrl + "user/getProfileData",
  EDitProfile: ApiBaseUrl + "user/editprofile",
  GetAllService: ApiBaseUrl + "home/service",
  searchTalentData: ApiBaseUrl + "home/talent",

  GetChatData: ApiBaseUrl + "home/chatGet",

  GetWalletData: ApiBaseUrl + "user/wallet",
  GetAllBAnk: ApiBaseUrl + "home/banking",
  DeleteBankData: ApiBaseUrl + "home/bankid-remove",
  GetRevenueChart: ApiBaseUrl + "user/revenue-graph",
  getNotification: ApiBaseUrl + "user/notifget",

  GetCashoutData: ApiBaseUrl + "user/transfer-get",
};
