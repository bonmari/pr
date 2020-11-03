<template>
  <div>
    <el-button  id="show-modal" @click="showModal = true" class="modal">Show Modal</el-button>
    <div v-if="showModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
                <el-button @click="showModal = false" class="el">close</el-button>
                    <div class="app-container">   
                      <el-table
                        v-loading="listLoading"
                        :data="list"
                        element-loading-text="Loading"
                        border
                        fit
                        highlight-current-row>
                        <el-table-column align="center" label="ID" width="95">
                          <template slot-scope="scope">
                            {{ scope.$index }}
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="Author"
                          width="180"
                          align="center"
                        >
                          <template slot-scope="scope">
                            <span>{{ scope.row.username }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="Price"
                          width="80"
                          align="center"
                        >
                          <template slot-scope="scope">
                            {{ scope.row.price }}
                          </template>
                        </el-table-column>
                        <el-table-column label="Status">
                          <template slot-scope="scope">
                            {{ scope.row.status}}
                          </template>
                        </el-table-column>
                        <el-table-column
                          class-name="status-col"
                          label="Status"
                          width="110"
                          align="center"
                        > 
                      <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.timestamp | parseTime }}</span>
                      </template>  
                      </el-table-column>
                    </el-table>
                  </div>             
              </div>
            </div>
        </div>
      </div>
  </div>
</template>
<style>
.mod{
  margin:100px;
  width:100px;
}
.modal{
  margin:100px;
}
.el{
  margin:0 85%;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  height: 80%;
  width: 50%;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-body {
  margin: 20px 0;

}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getArticles } from '@/api/articles'
import { getTransactions } from '@/api/transactions'
import { ITransactionData } from '@/api/transactions'
import { IArticleData } from '@/api/types'

@Component({
  name: 'Hello',
  data: function () {
            return {
                showModal: false
            }
        },
        methods: {
        },
        filters: {
    statusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    parseTime: (timestamp: string) => {
      return new Date(timestamp).toISOString()
    }
  }
})
export default class extends Vue {
  private onSubmit() {
    this.$message('Hello, World!')
    
  }
  private list: ITransactionData[] = []
  private listLoading = true
  public listQuery = {
    limit: 2
  }

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    const { data } = await getTransactions(this.listQuery)
    this.list = data.items
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 5000)
  }
}
</script>