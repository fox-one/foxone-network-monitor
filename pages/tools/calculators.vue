<template>
  <section class="container">
    <div class="top">
      <h1 class="title page-title">Calculators</h1>
    </div>

    <div class="section-title">~ XIN Mining Rewards ~</div>
    <el-form label-width="100px" class="pane-like">
      <el-form-item label="Rewards Vol">
        <el-input v-model="miningRewardsForm.rewardVolume">
          <template slot="append">XIN</template>          
        </el-input>
      </el-form-item>
      <el-form-item label="Rewards %">
        <el-input v-model="miningRewardsForm.yearlyPercent">
          <template slot="append">%</template>          
        </el-input>
      </el-form-item>
      <el-form-item label="Node Count">
        <el-input v-model="miningRewardsForm.nodeCount"></el-input>
      </el-form-item>
      <el-row style="margin: 10px 0 20px;">
        <el-button type="primary" @click="calMiningRewardForm">Calculate</el-button>        
      </el-row>
      <el-table  class="results"
        empty-text="No data."
        :show-header="false"
        :data="miningRewardsResult"
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="key"
          width="140">
        </el-table-column>
        <el-table-column
          prop="value"
        >
        </el-table-column>
      </el-table>       
    </el-form>

    <div class="section-title">~ Fox.ONE Pre-Mining Rewards ~</div>
    <el-form label-width="120px" class="pane-like">
      <el-form-item label="Daily Rewards">
        <el-input v-model="preMiningRewardsForm.rewardPerDay">
          <template slot="append">XIN</template>          
        </el-input>
      </el-form-item>
      <el-form-item label="Rewards %">
        <el-input v-model="preMiningRewardsForm.percent">
          <template slot="append">%</template>          
        </el-input>
      </el-form-item>
      <el-form-item label="Total shares">
        <el-input v-model="preMiningRewardsForm.totalParticipates">
          <template slot="append">FMC1</template>          
        </el-input>
      </el-form-item>
      <el-form-item label="Your shares">
        <el-input v-model="preMiningRewardsForm.participates">
          <template slot="append">FMC1</template>          
        </el-input>
      </el-form-item>
      <el-row style="margin: 10px 0 20px;">
        <el-button type="primary" @click="calPreMiningRewardForm">Calculate</el-button>        
      </el-row>
      <el-table class="results"
        empty-text="No data."
        :show-header="false"
        :data="preMiningRewardsResult"
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="key"
          width="140">
        </el-table-column>
        <el-table-column
          prop="value"
        >
        </el-table-column>
      </el-table>       
    </el-form>

  </section>
</template>

<script>
const FULLNODE_CAP = 10000
export default {
  data () {
    return {
      miningRewardsForm: {
        rewardVolume: 450000,
        yearlyPercent: 10,
        nodeCount: 15,
      },
      miningRewardsResult: [],
      preMiningRewardsForm: {
        rewardPerDay: 0.6,
        percent: 50,
        totalParticipates: 500,
        participates: 1
      },
      preMiningRewardsResult: [],
    }
  },
  methods: {
    calMiningRewardForm () {
      let result = {
        dailyRewardsPerNode: 0,
        yearlyRewardsPerNode: 0,
        annualizedRateOfReturn: 0
      }
      let form = this.miningRewardsForm
      result.yearlyRewardsPerNode = (form.rewardVolume * (form.yearlyPercent/100) / form.nodeCount)
      result.dailyRewardsPerNode = result.yearlyRewardsPerNode / 365
      result.annualizedRateOfReturn = (result.yearlyRewardsPerNode/FULLNODE_CAP) * 100
      this.miningRewardsResult = [{
        key: 'Yearly rewards/node',
        value: result.yearlyRewardsPerNode.toFixed(2) + ' XIN'
      }, {
        key: 'Daily rewards/node',
        value: result.dailyRewardsPerNode.toFixed(4) + ' XIN'
      }, {
        key: 'Annualized ROR',
        value: result.annualizedRateOfReturn.toFixed(2) + '%'
      }]
    },
    calPreMiningRewardForm () {
      let result = {
        dailyRewards: 0,
        yearlyRewards: 0,
        annualizedRateOfReturn: 0
      }
      let form = this.preMiningRewardsForm
      result.dailyRewards = (form.rewardPerDay * (form.percent/100) / form.totalParticipates)
      result.yearlyRewards = result.dailyRewards * 365
      result.annualizedRateOfReturn = (result.yearlyRewards/1) * 100
      this.preMiningRewardsResult = [{
        key: 'Yearly rewards/share',
        value: result.yearlyRewards.toFixed(8) + ' XIN'
      }, {
        key: 'Daily rewards/share',
        value: result.dailyRewards.toFixed(8) + ' XIN'
      }, {
        key: 'Annualized ROR',
        value: result.annualizedRateOfReturn.toFixed(2) + '%'
      }, {
        key: 'Annualized return',
        value: (result.yearlyRewards * form.participates).toFixed(6) + 'XIN'
      }]
    }
  }
}

</script>

<style scoped>
.el-input {
  width: 140px;
}
.el-input /deep/ .el-input-group__append {
  padding: 0 10px !important;
}
.results {
  font-size: 12px;
}
</style>
