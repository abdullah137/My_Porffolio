function download() {
    axios({
          url: 'https://storage.googleapis.com/hotel-project-a01c4.appspot.com/invoice.pdf?GoogleAccessId=firebase-adminsdk-7wnwl%40hotel-project-a01c4.iam.gserviceaccount.com&Expires=1893456000&Signature=fkYgCyCPla3tSVdMsu%2B86DUNGTzh8zwcKirh6JfuE0ft%2FD2vmCpH2DPFMqCChhjabhKonyijRdWICC9GLpyEytQqPq5XiItn7WUmQz4e7ihcbHZSzrPI3HAA6nzR%2FxjE7O9Gl8ywceZZ0v7I85RxkZkKC%2BR9r4BOf3kBeWaZZQsflqYBisJHrljnZIAKv0O%2FWBYrRSQeOmhUUl1acpQ4jgCYloVNUPA6jtRZW0nKofZrsn9JuUCK2poedXPwanj1F8XVWmTpIvd91GO6cSJpPxNUY6basrhc8EIZl8gnjBNcRrlWbCt2QKkGM%2F5eYkM6QadSZR%2FPTSKVxbfPn57mBA%3D%3D',
          method: 'GET',
          responseType: 'blob',
          headers: {
                'Content-Type': 'application/pdf', // Set the Content-Type header
                'Content-Disposition': 'attachment; filename="invoice.pdf"' // Set the Content-Disposition header
              }
    })
          .then((response) => {
                const url = window.URL
                      .createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',   `invoice.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
          })
}
