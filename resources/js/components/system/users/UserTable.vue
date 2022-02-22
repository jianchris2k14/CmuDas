<template>
    <div class="container">
        <div class="table-responsive">

        <table id="myTable" class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Address</th>
                    <th scope="col">User Type</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = vfsFonts.pdfMake ? vfsFonts.pdfMake.vfs : pdfMake.vfs;
export default {
    methods:{
        getUsers() {
            axios.get('/api/users').then((response) => {
                $('#myTable').DataTable({
                    responsive: true,
                    select:true,
                    dom: 'Bfrtip',
                    buttons: [
                        { extend: 'pdfHtml5', text: '<i class="fa fa-file-pdf fa-1x" aria-hidden="true"></i>' },
                        { extend: 'csv', text: '<i class="fas fa-file-excel fa-1x"></i>' },
                        { extend: 'excel', text: '<i class="fa fa-file-csv" aria-hidden="true"></i>' },
                        { extend: 'print', text: '<i class="fa fa-print" aria-hidden="true"></i>' },
                        'pageLength'
                    ],
                    data:response.data.data,
                    columns:[
                        {data: "user_id"},
                        {data: "name"},
                        {data: "email"},
                        {data: "phone_no"},
                        {data: "address"},
                        {data: "user_type"}
                    ]
                })
            }).catch((err) => {
                console.log(err.response)
            });
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>

