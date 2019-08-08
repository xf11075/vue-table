<template>
    <div class="gc-table">
        <table class="gc-table-head">
            <tr >
                <td class="gc-table-body-checkbox" v-if="selection">
                    <span class="gc-checkbox" @click="checkAll">
                        <span class="gc-checkbox-inner" v-show="allChecked"></span>
                    </span>
                </td>
                <td v-for="(v1,index1) in columns" :key="index1">
                    {{v1.title}}
                    <span class="caret-wrapper">
                        <i :class="[sortIndex==index1&&sortUp==1 ? 'curSort': '','sort-caret ascending']" @click="sort(1,v1.key,index1)"></i>
                        <i :class="[sortIndex==index1&&sortUp==-1 ? 'curSort': '','sort-caret descending']" @click="sort(-1,v1.key,index1)"></i>
                    </span>
                </td>
            </tr>
        </table>
        <table class="gc-table-body">
            <colgroup>
            </colgroup>
            <tbody>
            <tr v-for="(v1,index1) in data" :key="index1" @click="rowClick(v1,index1)" :class="highlight==index1?'highlightCurRow':''">
                <td class="gc-table-body-checkbox" v-if="selection">
                    <span class="gc-checkbox" @click="changeCheck(index1)">
                        <span class="gc-checkbox-inner" v-show="dataCheck[index1].check == true"></span>
                    </span>
                </td>
                <td v-for="(v2,index2) in columns" :key="index2">
                    {{v2.formatter && typeof v2.formatter==='function' ? v2.formatter(v1,v1[v2.key]): v1[v2.key]}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: "GcTable",
    data(){
      return{
        highlight:-1,
        data2:[],//data深拷贝
        dataCheck:[],
        allChecked:false,
        sortIndex:-1,
        sortUp:0,
      }
    },
    props:{
      data:{
        type:Array,
        default: function() {
          return [];
        }
      },
      columns:{
        type:Array,
        default: function() {
          return [];
        }
      },
      highlightCurRow:{
        type:Boolean,
        default: true
      },
      selection:{
        type:Boolean,
        default:false,
      },
    },
    components:{

    },
    methods:{
      // 行点击
      rowClick(v,index){
        this.highlight = index;
        this.$emit("rowClick",v,index)
      },
      //改变多选选项
      changeCheck(index){
        this.dataCheck[index].check = !this.dataCheck[index].check;
        this.dataCheck.splice(index, 1, this.dataCheck[index]);
        let checked = [];
        this.dataCheck.forEach((v,i) => {
          if(v.check){
            checked.push(this.data[i]);
          }
        })
        if(checked.length == this.data.length){
          this.allChecked = true;
        }else{
          this.allChecked = false;
        }
        this.$emit("selectionChange",checked)
      },
      //全选和全不选
      checkAll(){
        let checked = []
        if(this.allChecked){
          this.dataCheck = Array.apply(null, {length: this.data.length}).map( function(){
            return {check:false}
          })
        }else{
          this.dataCheck = Array.apply(null, {length: this.data.length}).map( function(){
            return {check:true}
          })
          checked = this.data;
        }
        this.allChecked = !this.allChecked;
        this.$emit("selectionChange",checked)
      },
      sort(d,key,index){
        let a = this.data;
        this.sortIndex = index;
        this.sortUp = d;
        //升序
        if(!isNaN(Number(a[1][key]))){
          a.sort((x,y) => {
            return d * (x[key]-y[key]);
          })
        }else if(new Date(a[1][key]) != 'Invalid Date'){
          a.sort((x,y) => {
            return d * (new Date(x[key]).getTime()-new Date(y[key]).getTime());
          })
        }
        this.data = a;
      },
    },
    created(){
      //深拷贝
      this.data2 = JSON.parse(JSON.stringify(this.data));
      this.dataCheck = Array.apply(null, {length: this.data.length}).map( function(){
        return {check:false}
      })
    },
    mounted(){

    }
  }
</script>

<style>
    .gc-table-head{
        table-layout: fixed;
        width:100%;
        color:#515a6e;
        font-size: 14px;
        border-collapse: collapse;
    }
    .gc-table-head tr{
        text-align: left;
        vertical-align: middle;
    }
    .gc-table-head tr td{
        border:1px solid #cccfd6;
        border-bottom:none;
        box-sizing: border-box;
        padding:8px 5px;
        font-weight:600;
    }
    .gc-table-body{
        table-layout: fixed;
        width:100%;
        font-size: 14px;
        border-collapse: collapse;
    }
    .gc-table-body tr{
        transition:background-color .25s ease;
        background:#fff;
    }
    .gc-table-body tr:hover{
        background:#f5f7fa;
        vertical-align: middle;
    }
    .gc-table-body tr.highlightCurRow{
        background:#ebf7ff;
    }
    .gc-table-body tr td{
        border:1px solid #cccfd6;
        color:#606266;
        box-sizing: border-box;
        padding:8px 5px;
    }
    .gc-table-body-checkbox{
        width:50px;
        text-align: center;
    }
    .gc-checkbox{
        vertical-align: middle;
        width:14px;
        height:14px;
        display: inline-block;
        position: relative;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        box-sizing: border-box;
        background-color: #fff;
        z-index: 1;
        cursor: pointer;
    }
    .gc-checkbox:hover{
        border-color:#409eff;
    }
    .gc-checkbox-inner{
        background-color: #409eff;
        border: 1px solid #409eff;
        display: inline-block;
        width: 14px;
        height: 14px;
        position: absolute;
        box-sizing: border-box;
        top: -1px;
        left: -1px;
        border-radius: 2px;
    }
    .gc-checkbox-inner:after{
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 1px;
        left: 4px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        -webkit-transform: rotate(45deg) scale(1);
        transform: rotate(45deg) scale(1);
    }
    .gc-table .caret-wrapper {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 18px;
        width: 24px;
        vertical-align: middle;
        cursor: pointer;
        overflow: initial;
        position: relative;
    }
    .gc-table .sort-caret {
        width: 0;
        height: 0;
        border: 5px solid transparent;
        position: absolute;
        left: 7px;
    }
    .gc-table .sort-caret.ascending {
        border-bottom-color: #c0c4cc;
        top: -3px;
    }
    .gc-table .curSort.sort-caret.ascending{
        border-bottom-color: #409eff;
    }
    .gc-table .sort-caret.descending {
        border-top-color: #c0c4cc;
        bottom: -3px;
    }
    .gc-table .curSort.sort-caret.descending{
        border-top-color: #409eff;
    }
</style>