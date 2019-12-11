import secrets

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = secrets.token_hex(nbytes=16)

DEBUG = True
ALLOWED_HOSTS = ['*']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'cem',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'TEST': {
            'NAME': 'test_cem_' + secrets.token_hex(nbytes=8)
        }
    }
}
