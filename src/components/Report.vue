<template>
  <div class='reprot'>
    <div class='header'>
      <div class='back-btn' @click="goBack">
        <Icon type="ios-arrow-left" class='back-icon'></Icon>
      </div>
      <div class='title'>平台使用记录</div>
      <div class='dp'>
      <date-picker :value="visitDate" format="yyyy-MM-dd" type="date" placeholder="选择日期" @on-change='dateSelect' :editable="editable" placement="bottom-end" class="datePicker" ></date-picker></div>
    </div>
      
    <!-- 上拉加载更多 -->
    <load-more
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    :bottomPullText='bottomText'
    :auto-fill="false"
    @bottom-status-change="handleBottomChange"
    ref="loadmore">

    <iTable border :columns="columns6" :data="data5"></iTable>
    <br/>
    <div v-show="loading" slot="bottom" class="loading">
      <Spin size="large"></Spin>
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
        editable: false,
          //  上拉加载数据
          scrollHeight: 0,
          scrollTop: 0,
          containerHeight: 0,
          loading: false,
          allLoaded: false,
          bottomText: '上拉加载更多...',
          bottomStatus: '',
          pageNo: 0,
          pageSize: 10,
          visitDate: new Date(),
          totalCount: '',

          columns6: [
          {
            title: '时间',
            key: 'visitTime'
          },
          {
            title: '姓名',
            key: 'visitorName'
          },
          {
            title: '账号',
            key: 'visitorId'
          }
          // ,
          // {
          //   title: '部门',
          //   key: 'department',
          //   filters: [
          //   {
          //     label: '运营',
          //     value: '运营'
          //   },
          //   {
          //     label: '技术',
          //     value: '技术'
          //   },
          //   {
          //     label: '合规',
          //     value: '合规'
          //   },
          //   {
          //     label: '综合',
          //     value: '综合'
          //   },
          //   {
          //     label: '资管',
          //     value: '资管'
          //   }
          //   ],
          //   filterMethod (value, row) {
          //     return row.department.indexOf(value) > -1;
          //   }
          // }
          ],
          data5: []
        }
      },
      computed: {
        user () {
          return this.$store.state.user
        }
      },
      methods:{
        goBack: function(){
          this.$router.push('/');
        },
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
          var param = {
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            visitPageValue: 'appdoor_index',
            visitDate: this.visitDate,
            isFilterVisitorName: true
          };
          webServer.getVisitPage(param).then(res => {
            for(var i in res.data){
              var item = res.data[i];
              item.visitTime = item.visitTime.substr(11);
              this.data5.push(item);
            }
            setTimeout(() => {
              this.$nextTick(() => {
                this.loading = false;
              })
            }, 1000)
          });
        },
        handleBottomChange(status) {
          this.bottomStatus = status;
        },
        dateSelect(date){
          if(date==''|| date == this.visitDate){
            return;
          }
          this.data5 = [];
          this.visitDate = date;
          this.pageNo = 0;
          this.loadBottom();

        }
      },
      created: function() {
        if(!this.user.userid){
          this.$router.go(-1);
        }
        var date = new Date();
        var Y = date.getFullYear();
        var m = date.getMonth() + 1;
        if (m < 10) {
          m = '0' + m;
        }
        var d = date.getDate();
        this.visitDate =  Y+'-'+m+'-'+d;
        this.loadBottom();
      }
    }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .header{
      background: #29a9fd;
      width: 100%;
      height: 1.3rem;
      position: relative;
      display: table;
    }
    .datePicker{
      position: relative;
    }
    .back-btn{
      position: relative;
      display: table-cell;
      width: 1rem;
      vertical-align: middle;
    }
    .back-icon{
      font-size: 0.9rem;
    }
    .title{
      font-size: 0.5rem;
      display: table-cell;
      vertical-align: middle;
    }
    .dp{
      display: table-cell;
      vertical-align: middle;
      position: relative;
      width:112px;
    }
  </style>