const mongoose = require('mongoose'); // Mongoose ko require kar rahe hain taake MongoDB ke saath kaam kar sakein

const categorySchema = mongoose.Schema({
    name: {
        type: String,  // Name ka data type String hoga
        required: true // Ye field required hai, bina iske data save nahi hoga
    },
    images: [
        {
            type: String,  // Images ek array hai, jisme har entry ek String hogi (image URL ya path)
            required: true // Ye bhi required hai
        }
    ],
    color: {
        type: String,  // Color ka data type bhi String hoga
        required: true // Ye field bhi required hai
    }
});

exports.Category = mongoose.model('Category', categorySchema);
// 'Category' naam ka ek model bana rahe hain jo categorySchema ko follow karega.
