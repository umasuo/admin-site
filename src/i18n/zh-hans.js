/* eslint-disable */

export default {
  misc: {
    pls_wait: '请稍候...',
    loading: '正在加载',
    unknow_error: '发生未知错误，请刷新后重试',
    fetch_data_fail: '部分数据获取失败，可能是网络断开，请刷新重试',
    save_fail: '保存失败，请刷新重试',
    delete_fail: '删除失败，请刷新重试',
    must_provide: '必须填写所有选项',
    search: '查询',
    confirm: '确认',
    close: '关闭',
    view: '查看',
    modify: '修改',
    edit: '编辑',
    generate: '生成',
    manage: '管理',
    add: '添加',
    delete: '删除',
    save: '保存',
    cancel: '取消',
    create: '创建',
    unit: '单位',
    filter_options: '过滤条件',
    title: '标题',
    icon: '图标',
    name: '名称',
    type: '类型',
    description: '介绍',
    state: '状态',
    email: '邮箱',
    phone: '手机',
    operation: '操作',
    empty: '无',
    not_set: '未设置',

    next_step: '下一步',
    previous_step: '上一步'
/*
$t('misc.')
{{$t('misc.')}}
*/
  },

  app: {
    area: {
      cn: '中国区域',
      na: '北美区域'
    },
    lang: '语言',
    lang_options: {
      zh_cn: '中文',
      en_us: '英语'
    },
    timezone: '时区',

    console_footer: 'Eva Cloud developer console',
    icp_license: '粤ICP备17102166号'
  },

  nav: {
    dashboard: '仪表盘',
    product_types: '产品类别',
    developers: '开发者',
    applications: '产品上架申请'
  },

  auth: {
    login: '登陆',
    logout: '注销',
    email: '邮箱',
    pwd: '密码',
    repeat_pwd: '重复密码',
    forgot: '忘记密码？',
    no_account: '还没有账户？',
    has_account: '已经有一个账号了？',
    go_register: '注册一个',
    register: '注册',
    change_pwd: '修改密码',

    email_format_wrong: '邮箱格式错误，请检查后再试',
    pwd_format_wrong: '密码格式错误，至少需要8位，包含小写字母及数字',
    rpwd_not_match: '两次密码输入不一致，请检查后再试',
    account_not_exist: '用户不存在',
    credential_wrong: '邮箱或密码错误',
    email_taken: '该邮箱已经注册',

    go_verify_email: '一封包含验证链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。',
    verify_success: '邮箱验证成功',
    go_login_2: '前往登陆',
    go_login_1: '您的邮箱已经验证成功，请',
    verify_failed: '邮箱验证出错',
    verify_failed_msg: '您的邮箱验证失败，可能是由验证链接过期或复制不完整导致，请检查链接是否复制正确，或于登录后点击右上角头像重发。',
    resent_verify_email: '重发验证邮件',
    resent_success: '发送成功',
    wait_for_cd: '请等待倒计时结束后再次发送',
    might_cd_wrong: '发送验证邮件失败，可能是网络断开或请求过于频繁，请稍后再试',

    retrive_pwd: '找回密码',
    input_retrive_email: '请输入要找回密码的邮箱',
    go_retrive_email: '一封包含重置链接的邮件已经发送到您填写的邮箱，请查看邮件并跟随邮件内指引操作。',
    not_registed: '没有该邮箱的注册记录',
    send_reset_link: '发送重置密码链接',
    reset_success: '密码重置成功，请',
    relogin: '重新登陆',
    reset_pwd: '重置密码',

    change_pwd_success: '修改密码成功！',
    old_pwd: '旧密码：',
    new_pwd: '新密码：',
    repeat_new_pwd: '重复新密码：',
    input_old_pwd: '请输入旧密码',
    input_new_pwd: '请输入新密码',
    input_new_pwd_again: '请再次输入新密码'
  },

  dashboard: {
    developers: '总开发者数',
    users: '总用户数',
    devices: '总设备数',
    products: '总产品数'
  },

  device_manage: {
    product: '产品',
    p_all_product: '所有产品',
    p_band: '手环',
    p_weight: '体重秤',
    is_active: '是否激活',
    user_phone: '用户手机',
    union_id: '出厂ID',
    device_id: '设备ID',

    device_list: '设备列表',
    device_icon: '设备图标',
    belong_product: '所属产品',
    belong_user: '所属用户',
    binding_state: '绑定状态',

    binding_state_1: '于',
    binding_state_2: '绑定',
    binding_state_3: '解绑'
  },

  user_manage: {
    user_id: '用户ID',
    user_list: '用户列表',
    register_date: '注册时间'
  },

  feedback_manage: {
    type: '反馈类型',
    t_all: '所有类型',
    t_question: '咨询',
    t_thanks: '感谢',
    t_complain: '投诉',
    t_error: '报错',
    is_handled: '是否已处理',

    feedback_list: '用户反馈列表',
    feedback_date: '反馈时间',
    handle_date: '处理时间'
  },

  product_definition: {
    product_definition: '产品定义',
    develop: '开发调试',
    production: '批量投产',

    create_product: '创建产品类别',
    quick_create: '或快速创建',
    reselect: '重选产品类别',
    name: '产品类别名称',
    group_name: '所属产品组',
    bluetooth: '蓝牙',

    has_same_name: '已经存在相同名字的产品了',

    product_list: '产品类别列表',
    network_type: '联网类型',

    credential: '凭据',
    union_id: 'Union ID',
    secrect_key: 'Secrect Key',

    std_func: '标准功能',
    custom_func: '自定义功能',

    std_data: '标准数据',
    custom_data: '自定义数据',

    debug_device: '调试设备',
    buy_dev_device: '购买开发设备',
    buy_module: '购买模块',

    choose_module: '选择模块',
    buy_quantity: '采购数量',
    shipping_info: '收货信息',

    shipping_name: '收货人姓名',
    shipping_phone: '联系电话',
    shipping_addr: '收货地址',

    submit_buy_request: '提交采购申请',

    basic_info: {
      edit_info: '编辑产品信息',
      product_model: '产品型号',
      product_model_desc: '可按产品实际型号输入',
      firmware_version: '固件版本',
      product_firmware_version_desc: '请填写产品的固件版本信息',
      module_model: '模组型号',
      desc_description: '如产品特点，销售地区，创建人等',

      load_fail: '加载失败',
      upload_fail: '上传失败',
      unknow_error: '未知错误',
      select_icon: '选择图标'
    },

    func: {
      name: '功能点',
      trans_type: '数据传输类型',
      type: '功能点类型',
      prop: '功能点属性',

      datatype: {
        enum: '枚举型',
        value: '数值型',
        // 这里使用 string template 的语法，但不带反引号不通过 babel 转译，而是在运行时自行解析，这样一来不同的语言就可以更自然的组织自己的语序。
        value_1: '数值：从${dataType.startValue}到${dataType.endValue}, 间隔${dataType.interval}, 倍数${dataType.multiple}',
        bool: '布尔型',
        string: '字符型'
      },

      transfer: {
        up: '只上报',
        down: '只下发',
        updown: '可上报可下发'
      },

      std_func_manager: '管理标准功能',
      no_std_func: '没有可用的标准功能',
      add_std_func_error: '添加标准功能出错，请刷新重试'
    },

    func_editor: {
      name: '功能点名称',
      id: '功能 ID',
      type: '数据类型',
      desc: '根据产品实际功能来设定',

      value: '数值范围',
      input_int: '请输入整数',

      interval: '间距',
      multiple: '倍数',
      unit: '单位',

      enum: '枚举值',
      enum_hint: '将枚举值填入此处，用英文逗号分隔',
      enum_duplicate: '枚举值不允许重复，保存时将会自动去重',

      max_lenght: '最大长度：',
      max_lenght_hint: '不超过255个字节'
    },

    data: {
      std_manager: '管理标准数据',
      no_std_data: '没有可用的标准数据',

      id: '数据 ID',
      name: '数据名',
      def: '数据定义',
      def_1: '(使用',
      def_2: 'JSON Schema',
      def_3: 'drafts-04 描述数据格式)',

      update_demo_data: '更新范例数据',
      err: '格式有误',
      show_err_detail: '显示详细错误信息',
      demo_data: '范例数据(根据定义随机生成)'
    }
  },

  public_prodcut: {
    developing: '发布产品',
    developing_hint: '产品审核过程中，以及成功发布后，功能都会被锁定',
    checking: '取消发布',
    checking_hint: '正在审核中，已经锁定产品所有功能',
    published: '下架',
    published_hint: '注意：下架后无法再次上架，谨慎操作',
    revoked: '已下架'
  },

  gen_union_id: {
    title: '批量生成 Union ID',
    input_quantity: '输入生成数量（1-10000）',
    gen_fail: '生成失败，请刷新后重试'
  }
/*
$t('product_definition.func_editor.')
{{$t('product_definition.func_editor.')}}
*/
}
