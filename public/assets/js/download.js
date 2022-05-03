function download() {
    axios({
          url: 'http://localhost:3000',
          method: 'GET',
          responseType: 'blob'
    })
          .then((response) => {
                const url = window.URL
                      .createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'abdullah.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
          })
}