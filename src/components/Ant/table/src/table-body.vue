<template>
    <div class="gc-table-body-wraper">
        <table class="gc-table-body">
            <colgroup>
            </colgroup>
            <tbody>
                <tr v-for="(v1,index1) in data" :key="index1" @click="rowClick(v1,index1)" :class="highlight==index1?'highlightCurRow':''">
                    <td class="gc-table-body-checkbox">
                        <span class="gc-checkbox" @click="changeCheck(index1)">
                            <span class="gc-checkbox-inner" v-show="data2[index1].check == true"></span>
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
    name: "GcTableBody",
    data(){
      return {
        highlight:-1,
        data2:[]
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
    methods:{
      rowClick(v,index){
        this.highlight = index;
        this.$emit("rowClick",v,index)
      },
      changeCheck(index){
        this.data2[index].check = !this.data2[index].check;
        this.data2.splice(index, 1, this.data2[index]);
      }
    },
    created(){
      //深拷贝
      this.data2 = JSON.parse(JSON.stringify(this.data));
    }
  }
</script>

<style>
    .gc-table-body-wraper{
        width:100%;
    }
    .gc-table-body{
        table-layout: fixed;
        width:100%;
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
        transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
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
        transition: border-color .2s ease-in-out,background-color .2s ease-in-out,box-shadow .2s ease-in-out;
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
        transition: all .2s ease-in-out;
    }
</style>