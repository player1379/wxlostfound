// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}

  },

  showtip: function () {
    var that = this;
    wx.showModal({
      title: '联系方式',
      content: '手机号码：' + that.data.detail.mobile,
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          that.complete()
        }
        else {//这里是点击了取消以后
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://lost.jystudio.top/api/lost-detail?id=' + options.id, //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        // code: res.code,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({ title: '查询成功', icon: 'success', duration: 1000 });
          that.setData({ detail: res.data.data })
        }
        else {
          wx.showToast({ title: '查询失败', icon: 'loading', duration: 1000 });
        }
      },
      fail() {
        wx.showToast({ title: '查询失败,请检查网络链接', icon: 'loading', duration: 1000 });
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  complete:function(){
    var that = this;
    wx.request({
      url: 'http://lost.jystudio.top/api/complete-lost?id=' + that.data.detail.id, //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        // code: res.code,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({ title: '提交成功', icon: 'success', duration: 1000 });
          setTimeout(function () {
            wx.navigateBack({
              delta:1
            })
          }, 1500)
        }
        else {
          wx.showToast({ title: '提交失败', icon: 'loading', duration: 1000 });
        }
      },
      fail() {
        wx.showToast({ title: '提交失败,请检查网络链接', icon: 'loading', duration: 1000 });
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})