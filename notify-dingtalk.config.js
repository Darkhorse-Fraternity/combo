/*
 * @Author: tonyYo
 * @Date: 2020-12-25 10:38:45
 * @LastEditors: tonyYo
 * @LastEditTime: 2020-12-25 10:48:53
 * @FilePath: /Combo/notify-dingtalk.config.js
 */

// SEC5473ca283f21e0489e77d10794b08ff6e1eb83c85f8ee7ce79de7cf05cd09c0d
// https://oapi.dingtalk.com/robot/send?access_token=07a7caf0da9b9c95e1733aec323521a1f74ba50c9ec32797904fa2f0f7af4b44
const accessToken =
  '07a7caf0da9b9c95e1733aec323521a1f74ba50c9ec32797904fa2f0f7af4b44';
const secret =
  'SEC5473ca283f21e0489e77d10794b08ff6e1eb83c85f8ee7ce79de7cf05cd09c0d';

const {
  defineConfig,
  getLatestConventionalChangelog,
} = require('notify-dingtalk');
const { dedent } = require('vtils');

module.exports = defineConfig({
  accessToken,
  secret,
  title: '发布公告',
  content: dedent`
      # 发布公告
  
      ---
  
      ${getLatestConventionalChangelog('./docs/CHANGELOG.md')}
  
      ---
  
      [进入主页→](https://github.com/Darkhorse-Fraternity/combo)
    `,
});
