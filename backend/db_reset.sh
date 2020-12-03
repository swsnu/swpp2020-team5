rm -rf ATM/__pycache__ ATM/migrations;
rm db.sqlite3
python manage.py makemigrations ATM;
python manage.py migrate
