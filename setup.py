from setuptools import setup

setup(
    name='StritLife',
    version='1.0',
    long_description=__doc__,
    author='Petr Devaikin',
    author_email='p.devaikin@gmail.com',
    include_package_data=True,
    zip_safe=False,
    setup_requires=['Flask'],
    install_requires=['peewee', 'python-instagram', 'pytz', 'requests', 'pillow',
        'colorthief', 'Flask']
)
