from setuptools import setup

setup(
    name='Nevsky',
    version='1.0',
    long_description=__doc__,
    author='Petr Devaikin',
    author_email='p.devaikin@gmail.com',
    include_package_data=True,
    zip_safe=False,
    install_requires=['peewee', 'python-instagram', 'pytz', 'requests', 'pillow']
)
