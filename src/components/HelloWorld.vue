<template>
  <div class="hello">
    <div class="tWrap">
      <gc-table :data="data" :columns="columns"
        :highlightCurRow=true
        :selection=true
        @selectionChange="handleSelectionChange"
        @rowClick="rowClick">
      </gc-table>
      <!--<gc-pagination></gc-pagination>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      data:[
        {
          name:'小明',
          address:'金卡001',
          age:18,
          date:'2019-04-22'
        },
        {
          name:'小红',
          address:'金卡002',
          age:19,
          date:'2019-04-19'
        },
        {
          name:'小强',
          address:'金卡003',
          age:20,
          date:'2019-03-19'
        }
      ],
      columns:[
        {
          title:'姓名',
          key:'name',
        },
        {
          title:'年龄',
          key:'age',
          width:'50px'
        },
        {
          title:'地址',
          key:'address'
        },
        {
          title:'入职日期',
          key:'date'
        }
      ],
    }
  },
  methods:{
    rowClick(row,index){
      console.log("单选row:",row)
      console.log("单选index:",index)
    },
    handleSelectionChange(v){
      console.log("vvv",v)
    }
  }
}
</script>

<style scoped lang="scss">
  .tWrap{
    width:800px;
    height: 400px;
    margin:auto;
    border:1px solid aquamarine;
    padding:10px;
  }
</style>
