import mongoose from 'mongoose';

const listingPhotoSchema = new mongoose.Schema({
    photoUrl: { type: String, default:"https://mediaservice.themls.com/large/25-488121/25-488121_961eed84-5ae9-41ab-921b-85632fb66d5a.jpg" },
    __typename: { type: String, default: "ListingPhoto" },
});

const listingSchema = new mongoose.Schema({
    displayId: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    propertyType: { type: String },
    listPrice: { type: Number, required: true },
    closePrice: { type: Number, default: null },
    isLease: { type: Boolean , default: false},
    acreage: { type: Number },
    bathroomsTotal: { type: Number , default: 0},
    bedroomsTotal: { type: Number, default: 0 },
    livingArea: { type: Number },
    feedId: { type: String },
    photos: [listingPhotoSchema],
    standardStatus: { type: String, default: "ACTIVE" },
    unparsedAddress: { type: String, required: true },
    __typename: { type: String, default: "ListingV2" },
    city: { type: String, required: true },
    country: { type: String },
    listingId: { type: String, required: true },
    lpCurrency: { type: String, required: true, default: "USD" },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    streetName: { type: String, required: true },
    streetNumber: { type: String, required: true },
    streetSuffix: { type: String },
    lpShowMap: { type: Boolean,},
    slug: { type: String},
    tags: { type: [String], default: [] },
    isFavorited: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
});

const Listing = mongoose.models.Listing || mongoose.model('Listing', listingSchema);

export default Listing;
