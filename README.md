
### Api cek mutasi qris orderkuota Unofficial 

Repo: https://github.com/ZeroByte000/api-mutasi-orkut
Url Api: https://api-mutasi-orkut.vercel.app

Notes: Data aman gak  nyimmpen password ataupun token di server api, yang mau mau aja

### LOGIN REQUEST 
```
curl --location 'https://api-mutasi-orkut.vercel.app/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "USERNAME",
    "password": "PASSWORD"
}'
```


RESPONSE
```
{
    "success": true,
    "results": {
        "otp": "email",
        "otp_value": "EMA**************gmail.com"
    }
}
```


### VERIF OTP EMAIL
```
curl --location 'https://api-mutasi-orkut.vercel.app/api/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "USERNAME",
    "password": "OTP_EMAIL"
}'
```


RESPONSE
```
{
    "success": true,
    "results": {
        "otp": "",
        "id": "20XXXX",
        "name": "NAME",
        "username": "USERNAME",
        "balance": "2602000000",
        "token": "20XXXX:MNXXXXXXXXXXXXXXXXX"
    }
}
```



### CEK MUTASI REQUEST
```
curl --location 'https://api-mutasi-orkut.vercel.app/api/mutasi' \
--header 'Content-Type: application/json' \
--data '{
    "username": "USERNAME",
    "token": "20XXXX:MNXXXXXXXXXXXXXXXXX"
}'
```


RESPONSE 
```
{
    "success": true,
    "qris_history": {
        "success": true,
        "total": 0,
        "page": 1,
        "pages": 0,
        "results": []
    },
    "account": {
        "success": true,
        "results": {
            "id": 20XXXX,
            "username": "USERNAME",
            "name": "NAME",
            "email": "EMA**************gmail.com",
            "phone": "08XXXXXXXXXX",
            "balance": 2602000000,
            "balance_str": "2.602.000.000",
            "qris_balance": 211,
            "qris_balance_str": "211",
            "qrcode": "https://app.orderkuota.com/assets/qrcode/xxxxxxxxx.png",
            "qris": "https://qris.orderkuota.com/qrnobu/xxxxxxxx-QR.png",
            "qris_name": "QRIS NAME"
        }
    }
}
```
