module.exports = function () {
  return {
    'signin': {
      'developerView': {
        'id': '21107f9f-a1bf-478e-8117-c26580c6f237',
        'createdAt': 1501049561265, 'lastModifiedAt': 1501049561265, 'version': 0, 'email': 'public@evacloud.cn', 'phone': null, 'status': 'UNVERIFIED', 'openable': false
      },
      'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXZlbG9wZXIiLCJ0b2tlbklkIjoiMzc3MWQ2ZDYtOGI4ZC00NWI4LWJkMzktM2Q5NDA2MzY3MmI0Iiwic3ViamVjdElkIjoiMjExMDdmOWYtYTFiZi00NzhlLTgxMTctYzI2NTgwYzZmMjM3IiwiZ2VuZXJhdGVUaW1lIjoxNTAxMTQwNTk5ODA3LCJleHBpcmVzSW4iOjcyMDAwMDAsInNjb3BlcyI6W119.YMRHrS8r4k_sz7d7m_MK26edLmgUZpwJosp7kb4qkgfDhR_shxv99YUrf4Gh_oNNAM6eDNlGEzLv1v4gYoFF4w'
    },
    'userReports': [
      {
        'date': 1500444000,
        'increaseNumber': 1357,
        'activeNumber': 30,
        'totalNumber': 9346
      },
      {
        'date': 1500530400,
        'increaseNumber': 1357,
        'activeNumber': 30,
        'totalNumber': 9346
      },
      {
        'date': 1500616800,
        'increaseNumber': 1357,
        'activeNumber': 30,
        'totalNumber': 9346
      },
      {
        'date': 1500703200,
        'increaseNumber': 1357,
        'activeNumber': 30,
        'totalNumber': 9346
      },
      {
        'date': 1500789600,
        'increaseNumber': 1357,
        'activeNumber': 30,
        'totalNumber': 9346
      },
      {
        'date': 1500876000,
        'increaseNumber': 911,
        'activeNumber': 61,
        'totalNumber': 9677
      },
      {
        'date': 1500962400,
        'increaseNumber': 722,
        'activeNumber': 12,
        'totalNumber': 9925
      }
    ],
    'deviceReports': [
      {
        'date': 1500444000,
        'increaseNumber': 1357,
        'activeNumber': 300,
        'totalNumber': 3000
      },
      {
        'date': 1500530400,
        'increaseNumber': 400,
        'activeNumber': 340,
        'totalNumber': 3400
      },
      {
        'date': 1500616800,
        'increaseNumber': 600,
        'activeNumber': 400,
        'totalNumber': 4000
      },
      {
        'date': 1500703200,
        'increaseNumber': 900,
        'activeNumber': 490,
        'totalNumber': 4900
      },
      {
        'deviceDefinitionId': null,
        'date': 1500789600,
        'increaseNumber': 1100,
        'activeNumber': 600,
        'totalNumber': 6000
      },
      {
        'deviceDefinitionId': null,
        'date': 1500876000,
        'increaseNumber': 2000,
        'activeNumber': 800,
        'totalNumber': 8000
      },
      {
        'deviceDefinitionId': null,
        'date': 1500962400,
        'increaseNumber': 2000,
        'activeNumber': 1000,
        'totalNumber': 10000
      }
    ],
    'productTypes': [
      {
        'id': '77616169-cc17-4051-8657-f706e7f4d303',
        'name': '冰箱',
        'groupName': '大家电',
        'functions': [
          {
            'id': '2602b236-05f4-40df-a4ad-6feb5e91f16b',
            'functionId': 'cf001',
            'name': '开关',
            'description': null,
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '8d789b1d-7e99-47b5-971f-8ce4517e44aa',
            'functionId': 'cf002',
            'name': '工作模式',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'enum',
              'values': [
                'level1',
                'level2',
                'level3'
              ]
            }
          }
        ],
        'data': [
          {
            'id': '79f06fcb-c1f1-4791-a8b0-5f2043d39dc6',
            'dataId': 's003',
            'name': '温度2'
          },
          {
            'id': '0dd8c094-71b4-43c7-9bce-15adbfa63043',
            'dataId': 's004',
            'name': '温度2'
          },
          {
            'id': 'abf88f5a-5b5f-4a34-85cc-471ba1a73d23',
            'dataId': 's005',
            'name': '温度3'
          }
        ]
      },
      {
        'id': '10000',
        'name': '插座',
        'groupName': '电工照明',
        'functions': [
          {
            'id': '1001',
            'functionId': '1',
            'name': '开关',
            'description': null,
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '1002',
            'functionId': '2',
            'name': '同步时间',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 10000000000000,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '1003',
            'functionId': '3',
            'name': '倒计时',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 10000000000000,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '1004',
            'functionId': '4',
            'name': '状态查询',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'string'
            }
          },
          {
            'id': '101',
            'functionId': '101',
            'name': '插孔1',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '102',
            'functionId': '102',
            'name': '插孔2',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '103',
            'functionId': '103',
            'name': '插孔3',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '104',
            'functionId': '104',
            'name': '插孔4',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '105',
            'functionId': '105',
            'name': 'USB1',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '106',
            'functionId': '106',
            'name': 'USB2',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '107',
            'functionId': '107',
            'name': 'USB3',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '108',
            'functionId': '108',
            'name': 'USB4',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '109',
            'functionId': '109',
            'name': '状态上报',
            'description': null,
            'transferType': 'UP',
            'dataType': {
              'type': 'string'
            }
          }
        ],
        'data': null
      },
      {
        'id': '10002',
        'name': '照明',
        'groupName': '电工照明',
        'functions': [
          {
            'id': '3001',
            'functionId': '1',
            'name': '开关',
            'description': null,
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '3002',
            'functionId': '2',
            'name': '同步时间',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 10000000000000,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '3003',
            'functionId': '3',
            'name': '倒计时',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 10000000000000,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '3004',
            'functionId': '4',
            'name': '状态查询',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'string'
            }
          },
          {
            'id': '301',
            'functionId': '301',
            'name': '亮度',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 100,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '302',
            'functionId': '302',
            'name': '冷暖',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '303',
            'functionId': '303',
            'name': '模式',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'enum',
              'values': [
                '柔光模式',
                '缤纷模式',
                '炫彩模式',
                '斑斓模式'
              ]
            }
          },
          {
            'id': '304',
            'functionId': '304',
            'name': '状态上报',
            'description': null,
            'transferType': 'UP',
            'dataType': {
              'type': 'string'
            }
          }
        ],
        'data': null
      },
      {
        'id': '10001',
        'name': '开关',
        'groupName': '电工照明',
        'functions': [
          {
            'id': '2001',
            'functionId': '1',
            'name': '开关',
            'description': null,
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '2002',
            'functionId': '2',
            'name': '同步时间',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 10000000000000,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '2003',
            'functionId': '3',
            'name': '倒计时',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'value',
              'startValue': 0,
              'endValue': 10000000000000,
              'interval': 1,
              'multiple': 1,
              'unit': null
            }
          },
          {
            'id': '2004',
            'functionId': '4',
            'name': '状态查询',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'string'
            }
          },
          {
            'id': '201',
            'functionId': '201',
            'name': '开关1',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '202',
            'functionId': '202',
            'name': '开关2',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '203',
            'functionId': '203',
            'name': '开关3',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '204',
            'functionId': '204',
            'name': '开关4',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'boolean'
            }
          },
          {
            'id': '205',
            'functionId': '205',
            'name': '状态上报',
            'description': null,
            'transferType': 'UP',
            'dataType': {
              'type': 'string'
            }
          }
        ],
        'data': null
      },
      {
        'id': 'be9b50f3-0e7e-4398-8d74-7cf55e66f282',
        'name': '扫地机器人',
        'groupName': '小家电',
        'functions': [
          {
            'id': '74217304-b92a-4395-8bee-11260cd66fbf',
            'functionId': 'cf021',
            'name': '开关',
            'description': null,
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'value',
              'startValue': 1,
              'endValue': 100,
              'interval': 2,
              'multiple': 4,
              'unit': null
            }
          },
          {
            'id': '95290536-54de-48ba-9a37-97254618ec91',
            'functionId': 'cf022',
            'name': '清扫模式',
            'description': null,
            'transferType': 'DOWN',
            'dataType': {
              'type': 'string'
            }
          }
        ],
        'data': [
          {
            'id': 'becf9c78-8bfd-4b0e-b6af-170351b1d993',
            'dataId': 's001',
            'name': 'step'
          },
          {
            'id': 'a868479a-6331-4903-bcb4-774cd3522de9',
            'dataId': 's002',
            'name': '温度'
          }
        ]
      }
    ],
    'products': [
      {
        'id': '73a058f8-bcfe-4d2d-8f94-2f6d716c9750',
        'createdAt': 1501052328591,
        'lastModifiedAt': 1501052422617,
        'version': 5,
        'developerId': '21107f9f-a1bf-478e-8117-c26580c6f237',
        'status': 'DEVELOPING',
        'name': '冰箱',
        'productTypeId': '77616169-cc17-4051-8657-f706e7f4d303',
        'icon': 'http://fakeimg.pl/64x64',
        'dataDefinitions': [
          {
            'id': 'f0e3cbb5-b498-4083-9c1a-2fef0cb137c4',
            'version': 0,
            'dataId': 'newDataId',
            'schema': '{\'id\':\'node\',\'type\':\'object\',\'properties\':{\'title\':{\'type\':\'string\'},\'sub_nodes\':{\'type\':\'array\',\'items\':{\'$ref\':\'node\'}}},\'openable\':false,\'required\':[\'title\']}',
            'dataSchema': {
              'id': 'node',
              'type': 'object',
              'properties': {
                'title': {
                  'type': 'string'
                },
                'sub_nodes': {
                  'type': 'array',
                  'items': {
                    '$ref': 'node'
                  }
                }
              },
              'openable': false,
              'required': [
                'title'
              ]
            },
            'name': '范例数据定义',
            'description': '范例数据定义，修改以创建新的数据定义',
            'openable': null,
            'category': 'PRODUCT'
          },
          {
            'id': 'ea9b2828-1709-4dae-9c02-20423aa5adae',
            'version': 0,
            'dataId': 's003',
            'schema': '{\'id\':\'node\',\'type\':\'object\',\'properties\':{\'title\':{\'type\':\'string\'},\'sub_node\':{\'$ref\':\'node\'}}}',
            'dataSchema': {
              'id': 'node',
              'type': 'object',
              'properties': {
                'title': {
                  'type': 'string'
                },
                'sub_node': {
                  '$ref': 'node'
                }
              }
            },
            'name': '温度2',
            'description': 'what heppen when it is too long',
            'openable': null,
            'category': 'PLATFORM'
          }
        ],
        'functions': [
          {
            'id': '7c350236-dab3-4cc7-bdca-20f5ab5dd557',
            'functionId': 'cf001',
            'name': '开关',
            'description': null,
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'boolean'
            },
            'category': 'PLATFORM'
          },
          {
            'id': 'bb8ccacb-2746-4900-9b8f-eb687baacb07',
            'functionId': 'cfunc1',
            'name': 'cutom func',
            'description': 'demo cutom func',
            'transferType': 'UPDOWN',
            'dataType': {
              'type': 'value',
              'startValue': 1,
              'endValue': 100,
              'interval': 1,
              'multiple': 0,
              'unit': null
            },
            'category': 'PRODUCT'
          }
        ],
        'type': 'WIFI',
        'openable': false,
        'firmwareVersion': '123',
        'model': 'asdf',
        'wifiModule': '1',
        'description': 'fasdfefefefefe',
        'testUnion': {
          'unionId': '1154ac16-1e5f-4004-9816-daff7a994b47',
          'secretKey': 'OSRfaqI'
        }
      }
    ],
    'feedbacks': [
      {
        'id': 'fakeid-asdfasdf',
        'createdAt': 1501052328591,
        'lastModifiedAt': 1501052328591,
        'version': 1,
        'userId': 'fakeuserid-asdfasdfassdf',
        'developerId': 'fakedeveloperid-asdfasdf',
        'deviceId': 'fakedeviceid-asdfasdfa',
        'developerStatus': 'UNVIEWED', // 和下面一样
        'userStatus': 'UNVIEWED', // VIEWED UNVIEWED HANDLED
        'type': 'THANKS', // THANKS QUESTION COMPLAIN ERROR
        'contents': [
          {
            'createdAt': 1501052328591,
            'contents': 'Lorem asdf asd fas fe fw ef d fasd fa sdfa sdf wef a dsfa sfd awe fas df awefawd fas df a sdfa we fa sd fa sd fa sd'
          }
        ],
        'title': 'demo feedback',
        'phone': '12345678901',
        'email': 'public@evacloud.cn'
      }
    ]
  }
}
