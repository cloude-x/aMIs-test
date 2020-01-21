# -*- encoding: utf-8 -*-

{
    'name': 'Front test',
    'version': '1.0',
    'category': 'test',
    'description': """
        Front test
    """,
    'author': 'eRoad',
    'website': '',
    'depends': ['web'],
    'data': [
        'views/front_test1_view.xml'
    ],
    'qweb': ['static/src/xml/*.xml'],
    'demo': [],
    'installable': True,
    'auto_install': False,
    'remote_install': True,
    'sequence': 1,
    'maintainer': 'Developer',
}