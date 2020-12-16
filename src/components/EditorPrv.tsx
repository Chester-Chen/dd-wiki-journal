import React, { Component } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import * as dd from 'dingtalk-jsapi';
import lottie from 'lottie-web';
import { Button, message } from 'antd';

import 'easymde/dist/easymde.min.css';

export default class EditorPrv extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      userid: '', // user id
      access_token: '',
      editor: undefined,
      authCode: '', // 免登授权码
      AppKey: 'ding49en90whvkao1yhg',
      AppSecret:
        '6z80tMgoXwi-QKEXGOtUctmM60g1thb65_lOApmq03t1X31ibq6KQV8D_jqJzALK',
      corpId: 'dingee142412a919c640acaaa37764f94726',
    };
  }

  baseUrl = 'http://dingtalk.crazybro.top';

  async componentDidMount() {
    // await this.getUsrId();
    const { userid } = this.state;
    // alert('userid: ' + userid);
    // this.props.fetchEditUsr(await this.getUsrNameByUsrId(userid));
    this.createBtn();
  }

  createBtn = () => {
    let lte = lottie.loadAnimation({
      container: document.querySelector('#btn')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets7.lottiefiles.com/private_files/lf30_oxurudgk.json',
    });
    lte.play();
  };

  // 获取免登码
  getAuthCode = () => {
    return new Promise((resolve, reject) => {
      try {
        let that = this;
        dd.ready(function() {
          const { corpId } = that.state;
          dd.runtime.permission.requestAuthCode({
            corpId: corpId, // 企业id
            onSuccess: function(result) {
              that.setState(
                {
                  authCode: result.code,
                },
                () => resolve('ok'),
              );
            },
          });
        });
      } catch (error) {
        alert(JSON.stringify(error) + ' ,报错请@陈志文');
        reject(error);
      }
    });
  };

  // 获取access_token
  getAccessToken = () => {
    const { AppKey, AppSecret } = this.state;
    return fetch(
      `${this.baseUrl}/gettoken?appkey=${AppKey}&appsecret=${AppSecret}`,
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        // alert(`access_token: ${result['access_token']}`);
        this.setState({
          access_token: result['access_token'],
        });
      });
  };

  // 获取userid
  getUsrId = async () => {
    await this.getAuthCode();
    await this.getAccessToken();
    const { access_token, authCode } = this.state;
    return fetch(
      `${this.baseUrl}/user/getuserinfo?access_token=${access_token}&code=${authCode}`,
    )
      .then(res => res.json())
      .then(result => {
        // alert('userid: ' + result['userid']);
        this.setState({
          userid: result['userid'],
        });
      });
  };

  // 获取用户名
  getUsrNameByUsrId = async (userid: string) => {
    const { access_token } = this.state;
    const res = await fetch(
      `${this.baseUrl}/topapi/v2/user/get?access_token=${access_token}`,
      {
        method: 'POST',
        body: JSON.stringify({ userid }),
      },
    );
    const result = await res.json();
    return result['result']['name'];
  };

  // 提交日报
  submit = () => {
    this.getAuthCode().then(() => {
      const { editor, authCode, userid } = this.state;
      alert(editor.value()); // 日报内容
      alert('authCode: ' + authCode);

      // 把日报和userid传给信廷 todo
    });
  };

  // 去除fly样式
  rockedClick = () => {
    let btn = document.querySelector('#btn');
    btn?.classList.remove('rocket-fly');
    message.success('submit success✨');
  };

  // the rocked is clicked
  test = () => {
    let btn = document.querySelector('#btn');
    btn?.classList.add('rocket-fly');
    btn?.addEventListener('webkitAnimationEnd', this.rockedClick);
  };

  render() {
    return (
      <div>
        <SimpleMDE
          getMdeInstance={(i: object) => this.setState({ editor: i })}
        />
        {/* <Button type="primary" onClick={this.submit}>
          submit
        </Button> */}
        <div id="btn" onClick={this.test}></div>
      </div>
    );
  }
}
