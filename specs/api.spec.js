import axios from "axios";

describe.only('Create user', ()=> {
    it('fails with status 406: user exist', async () => {
        const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "Aliyah",
            "password": "AwjqA1A1!d"
        }
     }

     try {
        const resp = await axios(config);
     } catch (error) {
         expect(error.response.data.message).toEqual('User exists!');
         expect(error.response.status).toEqual(406)
     }

    })

    it('fails with status 400: uncorrect password', async () => {
        const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "Aliyah",
            "password": "Aw"
        }
     }

     try {
        const resp = await axios(config);
     } catch (error) {
         expect(error.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
         expect(error.response.status).toEqual(400)
     }

    })

    it('success: user created', async () => {
        let userName = "Al" + Math.random()
        const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": `${userName}`,
            "password": "AwjqA1A1!d"
        }
     }
         const resp = await axios(config);
         console.log(resp.data)
         expect(resp.status).toEqual(201)
    })

})

describe.only('Create token', ()=> {
    it('success: token created', async () => {
        const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "Aliyah",
            "password": "AwjqA1A1!d"
        }
     }
         const resp = await axios(config);
         expect(resp.status).toEqual(200);
         expect(resp.data.status).toEqual("Success");
         expect(resp.data.result).toEqual("User authorized successfully.")
    })

    it('fail: token not created', async () => {
        const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "Aliyah1",
            "password": "AwjqA1A1!d"
        }
     }
         const resp = await axios(config);
         expect(resp.status).toEqual(200);
         expect(resp.data.status).toEqual("Failed");
         expect(resp.data.result).toEqual("User authorization failed.")
    })
})