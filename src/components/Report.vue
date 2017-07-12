<template>
  <div class='reprot'>
  <!-- 上拉加载更多 -->
    <load-more
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    :bottomPullText='bottomText'
    :auto-fill="false"
    @bottom-status-change="handleBottomChange"
    ref="loadmore">

      平台使用记录
      <iTable border :columns="columns6" :data="data5"></iTable>
      部门使用统计、比例、排名
      <br/>
      公告、文件阅读记录
        <div v-show="loading" slot="bottom" class="loading">
          <Icon type="load-a"></Icon>
        </div>
    </load-more>
  </div>
</template>
<script>
  import loadmore from './Loadmore'
  import webServer from '../webServer'
  export default {
      data () {
          return {
            //  上拉加载数据
              scrollHeight: 0,
              scrollTop: 0,
              containerHeight: 0,
              loading: false,
              allLoaded: false,
              bottomText: '上拉加载更多...',
              bottomStatus: '',
              pageNo: 1,
              totalCount: '',

              columns6: [
                  {
                      title: '日期',
                      key: 'date'
                  },
                  {
                      title: '姓名',
                      key: 'name'
                  },
                  {
                      title: '部门',
                      key: 'address',
                      filters: [
                          {
                              label: '北京',
                              value: '北京'
                          },
                          {
                              label: '上海',
                              value: '上海'
                          },
                          {
                              label: '深圳',
                              value: '深圳'
                          }
                      ],
                      filterMethod (value, row) {
                          return row.address.indexOf(value) > -1;
                      }
                  }
              ],
              data5: [
                  {
                      name: '王小明',
                      age: 18,
                      address: '北京市朝阳区芍药居',
                      date: '2016-10-03'
                  },
                  {
                      name: '张小刚',
                      age: 25,
                      address: '北京市海淀区西二旗',
                      date: '2016-10-01'
                  },
                  {
                      name: '李小红',
                      age: 30,
                      address: '上海市浦东新区世纪大道',
                      date: '2016-10-02'
                  },
                  {
                      name: '周小伟',
                      age: 26,
                      address: '深圳市南山区深南大道',
                      date: '2016-10-04'
                  }
              ]
          }
      },
      methods:{
          /* 下拉加载 */
        _scroll: function(ev) {
            ev = ev || event;
            this.scrollHeight = this.$refs.innerScroll.scrollHeight;
            this.scrollTop = this.$refs.innerScroll.scrollTop;
            this.containerHeight = this.$refs.innerScroll.offsetHeight;
        },
        loadBottom: function() {
            this.loading = true;
            this.pageNo += 1;   // 每次更迭加载的页数
            if (this.pageNo == this.totalGetCount) {
                // 当allLoaded = true时上拉加载停止
                this.loading = false;
                this.allLoaded = true;
            }
            webServer.getArticleMenuList()
                    .then(res => {
                      console.log(res);
                this.data5.push(
                  {
                      name: '周小伟',
                      age: 26,
                      address: '深圳市南山区深南大道',
                      date: '2016-10-04'
                  });
                setTimeout(() => {
                  this.$nextTick(() => {
                    this.loading = false;
            	  })
            }, 1000)
         });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        }
      }

  }
</script>
