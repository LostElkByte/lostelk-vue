<template>
  <div class="account">
    <div class="edit-avatar margin-bottom-36">
      <div class="avatar">
        <h2 class="Edit-account-header">设置头像</h2>
        <form class="avatar-form" action="">
          <div class="choose-before">
            <div class="avatar-img">
              <svg class="icon avatar-icon" aria-hidden="true">
                <use xlink:href="#icon-weidenglu"></use>
              </svg>
            </div>

            <input class="avatar-form-input" type="file" id="avatar" />
            <label for="avatar" class="avatar-form-choose">
              选择头像
            </label>
          </div>
          <div class="choose-then">
            <label for="avatar" class="avatar-form-choose">
              重新选择
            </label>
            <div class="avatar-form-choose">
              取消
            </div>
            <div class="avatar-form-choose">
              提交
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="user-name margin-bottom-36">
      <form action="">
        <label for="user-name" class="Edit-account-header">修改用户名</label>
        <input type="text" id="user-name" placeholder="输入新的用户名" />
        <div class="edit-account-form-submit">
          提交
        </div>
      </form>
    </div>
    <div class="user-password margin-bottom-36">
      <form action="">
        <label for="user-password" class="Edit-account-header">修改密码</label>
        <input type="text" id="user-password" placeholder="输入新的密码" />
        <div class="edit-account-form-submit">
          提交
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import '../style/less/viewsStyle/edit-account.css';
</style>
