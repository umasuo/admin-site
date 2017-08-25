<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>告警信息</h2>

          <div class="clearfix"></div>
        </div>
        <div class="x_content">

          <table class="table">
            <thead>
              <tr>
                <th>信息ID</th>
                <th>设备类型</th>
                <th>信息标题</th>
                <th>内容</th>
                <th>发出时间</th>
              </tr>
            </thead>
            <tbody>
              <DataDefinitionRow v-for="dataDefinition in dataDefinitions"
                                   :dataDefinition="dataDefinition"
                                   :key="dataDefinition.dataId"
                                   @removeDataDefinition="removeDataDefinition"
                                   @updateDataDefinition="updateDataDefinition">
              </DataDefinitionRow>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DataDefinitionEditor from 'src/components/DataDefinitionEditor'
  import DataDefinitionRow from 'src/components/DataDefinitionRow'

  export default {
    name: 'MessageManager',

    data () {
      return {
        dataDefinitions: [
          {
            developerId: 'developer1',
            dataId: 'sh001',
            name: '手环步数概要',
            description: '手环步数概要数据',
            dataType: {
              id: 'node',
              type: 'object',
              properties: {
                title: {
                  type: 'string'
                },
                sub_node: {
                  '$ref': 'node'
                }
              }
            }
          }
        ]
        // end of dataDefinitions
      }
    },

    components: {
      DataDefinitionRow,
      DataDefinitionEditor
    }
  }
</script>

<style lang="scss">
</style>
