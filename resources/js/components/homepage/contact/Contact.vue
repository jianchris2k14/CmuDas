<template>
    <div class="container">
        <h3 class="display-3 text-center">Contact Us</h3>
        <div class="row">
            <div class="col-md-4">
                <div class="col-md-12 info" data-aos="flip-down">
                <div>
                    <h6 class="info-title text-uppercase text-white text-center">Our Address</h6>
                    <p class="description opacity-8 text-black text-center">Sayre Hwy, Maramag, Bukidnon</p>
                </div>
            </div>
            <div class="col-md-12 info mt-3" data-aos="flip-down">
                <div>
                    <h6 class="info-title text-uppercase text-white text-center">Our Phone</h6>
                    <p class="description opacity-8 text-black text-center">(088) 356 1910</p>
                    <p class="description opacity-8 text-black text-center">(088) 356 1910</p>
                </div>
            </div>
            <div class="col-md-12 mt-3 info" data-aos="flip-down">
                <div>
                    <h6 class="info-title text-uppercase text-white text-center">Our Email</h6>
                    <p class="description opacity-8 text-black text-center">Address</p>
                </div>
            </div>
            </div>
            <div class="col-md-8">
                <v-row>
                    <v-form>
                        <v-text-field outlined label="Name" dense></v-text-field>
                        <v-text-field outlined label="Email" dense></v-text-field>
                        <v-text-field outlined label="Subject" dense></v-text-field>
                        <v-textarea outlined name="input-7-4" label="Message"></v-textarea>
                        <v-btn color="info">Send</v-btn>
                    </v-form>
                </v-row>
            </div>

            
        </div>
    </div>
</template>
<style scoped>
.contact-info {
  font-size: 16px;
}
.contact-link {
  font-size: 16px;
}
</style>
