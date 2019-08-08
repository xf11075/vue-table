<!--<template>-->
    <!--<div class="gc-table-header-wraper">-->
        <!--<table class="gc-table__header">-->
            <!--<colgroup>-->
            <!--</colgroup>-->
            <!--<thead>-->
                <!--<tr>-->
                    <!--<th v-for="v1 in data">{{v1[lableName]}}</th>-->
                <!--</tr>-->
            <!--</thead>-->
        <!--</table>-->
    <!--</div>-->
<!--</template>-->

<script>
  export default {
    name: "GcTableHeader",
    data(){
      return {

      }
    },
    props:{
      columns:{
        type:Array,
        default: function() {
          return [];
        }
      },
      selection:{
        type:Boolean,
        default:false,
      },
    },
    render:function(h){
      let self = this;
      let selectAll = h('td',
        {
          attrs: {
            class:'gc-table-body-checkbox'
          },
        }
      )
      let thead = (h) => {
        return h('thead',[
            h('tr',
              selectAll,
              self.columns.map((v) => {
                return h('th',[
                  v.title
                ])
              })
            )
        ])
      }
      return h('table',
        {
          attrs: {
            class:'gc-table-header-wraper'
          },
        },
        [
        thead(h)
        ]
      )
    }
  }
</script>

<style>
    .gc-table-header-wraper{
        table-layout: fixed;
        width:100%;
        color:#909399;
        border-collapse: collapse;
    }
    .gc-table-header-wraper tr{
        text-align: left;
        vertical-align: middle;
    }
    .gc-table-header-wraper tr th{
        border:1px solid #cccfd6;
        border-bottom:none;
        box-sizing: border-box;
        padding:8px 5px;
    }

</style>