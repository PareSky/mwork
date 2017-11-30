<template>

  <div class="ChartWrapper" id='ChartWrapper'>
   ChartWrapper
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'
  import line from 'echarts/lib/chart/line'
  import tooltip from 'echarts/lib/component/tooltip'
  import markLine from 'echarts/lib/component/markLine'
  export default {
    name: 'charts',
    data () {
      return {
        prePage:''
      }
    },
    methods:{
      init : function(){
       var myChart = echarts.init(document.getElementById('ChartWrapper'));
        // 绘制图表
        myChart.setOption({
            tooltip : {
                trigger: 'axis',
                backgroundColor: '#fff',
                textStyle: '#667383'
            },
            xAxis: {
              name:'时间',
                data: ['9/2', '9/4', '9/6', '9/8', '9/10', '9/12']
            },
            yAxis: {
              name:'温度（摄氏度)',
            },
            series: [{
                name: '销量',
                type: 'line',
                itemStyle: {
                    normal: {
                        color:'#3186e2',
                        opacity : 0
                    },
                    emphasis :{
                      color:'#3186e2',
                      borderColor:'#fff',
                      borderWidth:1,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                      shadowBlur:2,
                      shadowOffsetY:2,
                      opacity : 1,
                    }
                },
                lineStyle:{
                  normal:{
                    width:5}
                  },
                areaStyle: {
                    normal: {
                        color:'#ebf3fe'
                    }
                },
                smooth:true,
                data: [5, 20, 36, 10, 10, 20],
                markLine:{
                  label:{
                    normal:{
                      position: 'start',
                      formatter: '{b}{c}℃'
                    }
                  },
                  data: [
                    {
                        name: '平均',
                        // 支持 'average', 'min', 'max'
                        type: 'average'
                    }]
                }
            }]
        });
      }
    },
    mounted:function(){
      console.log('mounted')
      this.init();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ChartWrapper{
  height: 10rem;
  width: 10rem;
}
</style>
