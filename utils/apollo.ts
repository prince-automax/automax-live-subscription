import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['Float'];
  bidVehicle?: Maybe<Vehicle>;
  bidVehicleId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type BidWhereUniqueInput = {
  bidVehicleId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export enum ContactUsStatusType {
  Created = 'created',
  Solved = 'solved'
}

export type CreateBidInput = {
  amount: Scalars['Float'];
};

export type CreateEmdupdateInput = {
  vehicleBuyingLimitIncrement?: InputMaybe<Scalars['Float']>;
};

export type CreateEnquiryInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
  state: StateNames;
  status?: InputMaybe<ContactUsStatusType>;
};

export type CreateEventInput = {
  bidLock?: InputMaybe<EventBidLockType>;
  downloadableFile_filename?: InputMaybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  eventCategory: EventCategory;
  extraTime?: InputMaybe<Scalars['Float']>;
  extraTimeTrigerIn?: InputMaybe<Scalars['Float']>;
  firstVehicleEndDate?: InputMaybe<Scalars['DateTime']>;
  gapInBetweenVehicles?: InputMaybe<Scalars['Float']>;
  noOfBids: Scalars['Float'];
  pauseDate?: InputMaybe<Scalars['DateTime']>;
  pausedTotalTime?: InputMaybe<Scalars['Float']>;
  startDate: Scalars['DateTime'];
  status?: InputMaybe<EventStatusType>;
  termsAndConditions: Scalars['String'];
  vehicleLiveTimeIn?: InputMaybe<Scalars['Float']>;
};

export type CreateExceluploadInput = {
  file_filename: Scalars['String'];
  name: Scalars['String'];
};

export type CreateLocationInput = {
  name: Scalars['String'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  paymentFor: PaymentType;
  status?: InputMaybe<PaymentStatusType>;
};

export type CreateRecentsoldInput = {
  image?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  soldDate?: InputMaybe<Scalars['String']>;
  vehicleName?: InputMaybe<Scalars['String']>;
};

export type CreateSellerInput = {
  GSTNumber?: InputMaybe<Scalars['String']>;
  billingContactPerson?: InputMaybe<Scalars['String']>;
  contactPerson?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  nationalHead?: InputMaybe<Scalars['String']>;
};

export type CreateStateInput = {
  name: StateNames;
};

export type CreateStatusInput = {
  comment: Scalars['String'];
  status: PaymentStatusTypes;
};

export type CreateUserInput = {
  BalanceEMDAmount?: InputMaybe<Scalars['Float']>;
  aadharcard_back_image?: InputMaybe<Scalars['String']>;
  aadharcard_front_image?: InputMaybe<Scalars['String']>;
  accessToken?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  driving_license_back_image?: InputMaybe<Scalars['String']>;
  driving_license_front_image?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  idProofNo?: InputMaybe<Scalars['String']>;
  idProofType?: InputMaybe<UserIdProofTypeType>;
  lastName?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
  pancardNo: Scalars['String'];
  pancard_image?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRoleType>;
  state?: InputMaybe<StateNames>;
  status?: InputMaybe<UserStatusType>;
  tempToken?: InputMaybe<Scalars['Float']>;
  userCategory?: InputMaybe<Scalars['String']>;
};

export type CreateVehicleInput = {
  YOM?: InputMaybe<Scalars['Float']>;
  additionalRemarks?: InputMaybe<Scalars['String']>;
  approxParkingCharges?: InputMaybe<Scalars['String']>;
  area?: InputMaybe<Scalars['String']>;
  auctionManager?: InputMaybe<Scalars['String']>;
  autobseContact?: InputMaybe<Scalars['String']>;
  autobse_contact_person?: InputMaybe<Scalars['String']>;
  bidAmountUpdate?: InputMaybe<Scalars['Float']>;
  bidStatus?: InputMaybe<VehicleBidStatusType>;
  buyerFees?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  chassisNo?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  clientContactNo?: InputMaybe<Scalars['String']>;
  clientContactPerson?: InputMaybe<Scalars['String']>;
  climateControl?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  currentBidAmount?: InputMaybe<Scalars['Float']>;
  dateOfRegistration?: InputMaybe<Scalars['String']>;
  doorCount?: InputMaybe<Scalars['Float']>;
  engineNo?: InputMaybe<Scalars['String']>;
  fitness?: InputMaybe<Scalars['String']>;
  fuel?: InputMaybe<Scalars['String']>;
  gearBox?: InputMaybe<Scalars['String']>;
  hypothication?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  inspectionLink?: InputMaybe<Scalars['String']>;
  insurance?: InputMaybe<Scalars['String']>;
  insuranceStatus?: InputMaybe<Scalars['String']>;
  insuranceValidTill?: InputMaybe<Scalars['String']>;
  kmReading?: InputMaybe<Scalars['Float']>;
  loanAgreementNo: Scalars['String'];
  lotNumber?: InputMaybe<Scalars['Float']>;
  make?: InputMaybe<Scalars['String']>;
  mileage?: InputMaybe<Scalars['Float']>;
  model?: InputMaybe<Scalars['String']>;
  ownership?: InputMaybe<Scalars['Float']>;
  parkingCharges?: InputMaybe<Scalars['String']>;
  parkingRate?: InputMaybe<Scalars['String']>;
  paymentTerms?: InputMaybe<Scalars['String']>;
  permit?: InputMaybe<Scalars['String']>;
  powerSteering?: InputMaybe<Scalars['String']>;
  quoteIncreament?: InputMaybe<Scalars['Float']>;
  rcStatus?: InputMaybe<Scalars['String']>;
  registeredOwnerName?: InputMaybe<Scalars['String']>;
  registrationNumber: Scalars['String'];
  repoDt?: InputMaybe<Scalars['String']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  rtoFine?: InputMaybe<Scalars['String']>;
  shape?: InputMaybe<Scalars['String']>;
  startBidAmount?: InputMaybe<Scalars['Float']>;
  startPrice?: InputMaybe<Scalars['Float']>;
  state?: InputMaybe<Scalars['String']>;
  tax?: InputMaybe<Scalars['String']>;
  taxValidityDate?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  varient?: InputMaybe<Scalars['String']>;
  vehicleCondition?: InputMaybe<Scalars['String']>;
  vehicleRemarks?: InputMaybe<Scalars['String']>;
  veicleLocation?: InputMaybe<Scalars['String']>;
  yardLocation?: InputMaybe<Scalars['String']>;
};

export type CreateVehiclecategoryInput = {
  name: Scalars['String'];
};

export type EmdUpdateWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Emdupdate = {
  __typename?: 'Emdupdate';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  emdNo: Scalars['Float'];
  id: Scalars['String'];
  payment?: Maybe<Payment>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  vehicleBuyingLimitIncrement?: Maybe<Scalars['Float']>;
};

export type Enquiry = {
  __typename?: 'Enquiry';
  createdAt?: Maybe<Scalars['DateTime']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
  mobile: Scalars['String'];
  state: Scalars['String'];
  status: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EnquiryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  CompletedEventCount?: Maybe<Scalars['Int']>;
  LiveEventCount?: Maybe<Scalars['Int']>;
  Report?: Maybe<Scalars['JSON']>;
  bidLock?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  downloadableFile_filename?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  eventCategory: Scalars['String'];
  eventNo: Scalars['Float'];
  extraTime?: Maybe<Scalars['Float']>;
  extraTimeTrigerIn?: Maybe<Scalars['Float']>;
  firstVehicleEndDate: Scalars['DateTime'];
  gapInBetweenVehicles?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  location?: Maybe<Location>;
  locationId: Scalars['String'];
  noOfBids: Scalars['Float'];
  pauseDate?: Maybe<Scalars['DateTime']>;
  pausedTotalTime?: Maybe<Scalars['Float']>;
  seller?: Maybe<Seller>;
  sellerId: Scalars['String'];
  startDate: Scalars['DateTime'];
  status?: Maybe<Scalars['String']>;
  termsAndConditions: Scalars['String'];
  totalEventsCount?: Maybe<Scalars['Int']>;
  upcomingEventCount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  vehicleCategory?: Maybe<VehicleCategory>;
  vehicleCategoryId: Scalars['String'];
  vehicleLiveTimeIn?: Maybe<Scalars['Float']>;
  vehicles?: Maybe<Array<Vehicle>>;
  vehiclesCount?: Maybe<Scalars['Int']>;
  vehiclesLive: Array<Vehicle>;
  vehiclesTemp: Array<Vehicle>;
  watchedBy?: Maybe<Array<User>>;
};


export type EventVehiclesArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type EventVehiclesLiveArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type EventVehiclesTempArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type EventListResponse = {
  __typename?: 'EventListResponse';
  completedEventCount?: Maybe<Scalars['Int']>;
  events?: Maybe<Array<Event>>;
  liveEventCount?: Maybe<Scalars['Int']>;
  totalBids?: Maybe<Scalars['Int']>;
  totalEventsCount?: Maybe<Scalars['Int']>;
  upcomingEventCount?: Maybe<Scalars['Int']>;
  vehiclesCount: Scalars['Int'];
};

export type EventOrderByInput = {
  bidLock?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  endDate?: InputMaybe<OrderDirection>;
  eventCategory?: InputMaybe<OrderDirection>;
  eventNo?: InputMaybe<OrderDirection>;
  extraTime?: InputMaybe<OrderDirection>;
  extraTimeTrigerIn?: InputMaybe<OrderDirection>;
  firstVehicleBidTimeExpire?: InputMaybe<OrderDirection>;
  gapInBetweenVehicles?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isSpecialEvent?: InputMaybe<OrderDirection>;
  noOfBids?: InputMaybe<OrderDirection>;
  pauseDate?: InputMaybe<OrderDirection>;
  pausedTotalTime?: InputMaybe<OrderDirection>;
  startDate?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  termsAndConditions?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  vehicleLiveTimeIn?: InputMaybe<OrderDirection>;
};

export type EventWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ExcelWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Excelupload = {
  __typename?: 'Excelupload';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  file_filename: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Location = {
  __typename?: 'Location';
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  state?: Maybe<State>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LocationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  mobile: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DeleteUserHardDelete: User;
  createBid: Bid;
  createEmdupdate: Emdupdate;
  createEnquiry: Enquiry;
  createEvent: Event;
  createExcelupload: Excelupload;
  createLocation: Location;
  createPayment: Payment;
  createRecentsold: Recentsold;
  createSeller: Seller;
  createState: State;
  createStatus: Status;
  createUser: User;
  createVehicle: Vehicle;
  createVehiclecategory: VehicleCategory;
  deleteBid: Bid;
  deleteEmdupdate: Emdupdate;
  deleteEnquiry: Enquiry;
  deleteEvent: Event;
  deleteExcelupload: Excelupload;
  deleteLocation: Location;
  deletePayment: Payment;
  deleteRecentsold: Recentsold;
  deleteSeller: Seller;
  deleteSellerHardDelete: Seller;
  deleteState: State;
  deleteStatus: Status;
  deleteUser: User;
  deleteVehicle: Vehicle;
  deleteVehiclecategory: VehicleCategory;
  login: LoginResponse;
  restoreEnquiry: Enquiry;
  restoreEvent: Event;
  restoreExcelUpload: Excelupload;
  restoreLocation: Location;
  restorePayment: Payment;
  restoreSeller: Seller;
  restoreStatus: Status;
  restoreUser: User;
  restoreVehicleCategory: VehicleCategory;
  restorevehicle: Vehicle;
  sendOtp: SendOtpResponse;
  updateBid: Bid;
  updateEmdupdate: Emdupdate;
  updateEnquiry: Enquiry;
  updateEvent: Event;
  updateLocation: Location;
  updatePayment: Payment;
  updateRecentsold: Recentsold;
  updateSeller: Seller;
  updateState: State;
  updateStatus: Status;
  updateUser: User;
  updateVehicle: Vehicle;
  updateVehicleCategory: VehicleCategory;
  verifyOtp: VerifyOtpResponse;
};


export type MutationDeleteUserHardDeleteArgs = {
  where: UserWhereUniqueInput;
};


export type MutationCreateBidArgs = {
  bidVehicleId: Scalars['String'];
  createBidInput: CreateBidInput;
  userUniqueInput?: InputMaybe<UserWhereUniqueInput>;
};


export type MutationCreateEmdupdateArgs = {
  createEmdupdateInput: CreateEmdupdateInput;
  paymentId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateEnquiryArgs = {
  createEnquiryInput: CreateEnquiryInput;
};


export type MutationCreateEventArgs = {
  createEventInput: CreateEventInput;
  locationId: Scalars['String'];
  sellerId: Scalars['String'];
  vehicleCategoryId: Scalars['String'];
};


export type MutationCreateExceluploadArgs = {
  createExceluploadInput: CreateExceluploadInput;
  eventId: Scalars['String'];
};


export type MutationCreateLocationArgs = {
  createLocationInput: CreateLocationInput;
  stateId: Scalars['String'];
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationCreateRecentsoldArgs = {
  createRecentsoldInput: CreateRecentsoldInput;
};


export type MutationCreateSellerArgs = {
  createSellerInput: CreateSellerInput;
};


export type MutationCreateStateArgs = {
  createStateInput: CreateStateInput;
};


export type MutationCreateStatusArgs = {
  createStatusInput: CreateStatusInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateVehicleArgs = {
  createVehicleInput: CreateVehicleInput;
  eventId: Scalars['String'];
};


export type MutationCreateVehiclecategoryArgs = {
  createVehiclecategoryInput: CreateVehiclecategoryInput;
};


export type MutationDeleteBidArgs = {
  where: BidWhereUniqueInput;
};


export type MutationDeleteEmdupdateArgs = {
  where: EmdUpdateWhereUniqueInput;
};


export type MutationDeleteEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};


export type MutationDeleteEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationDeleteExceluploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type MutationDeleteLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type MutationDeletePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationDeleteRecentsoldArgs = {
  where: RecentsoldWhereUniqueInput;
};


export type MutationDeleteSellerArgs = {
  where: SellerWhereUniqueInput;
};


export type MutationDeleteSellerHardDeleteArgs = {
  where: SellerWhereUniqueInput;
};


export type MutationDeleteStateArgs = {
  where: StateWhereUniqueInput;
};


export type MutationDeleteStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type MutationDeleteVehiclecategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type MutationLoginArgs = {
  loginInput: LoginUserInput;
};


export type MutationRestoreEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};


export type MutationRestoreEventArgs = {
  where: EventWhereUniqueInput;
};


export type MutationRestoreExcelUploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type MutationRestoreLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type MutationRestorePaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type MutationRestoreSellerArgs = {
  where: SellerWhereUniqueInput;
};


export type MutationRestoreStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type MutationRestoreUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationRestoreVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type MutationRestorevehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type MutationSendOtpArgs = {
  sendOtpDto: SendOtpDto;
};


export type MutationUpdateBidArgs = {
  updateBidInput: UpdateBidInput;
  where: BidWhereUniqueInput;
};


export type MutationUpdateEmdupdateArgs = {
  updateEmdupdateInput: UpdateEmdupdateInput;
  where: EmdUpdateWhereUniqueInput;
};


export type MutationUpdateEnquiryArgs = {
  updateEnquiryInput: UpdateEnquiryInput;
  where: EnquiryWhereUniqueInput;
};


export type MutationUpdateEventArgs = {
  updateEventInput: UpdateEventInput;
  where: EventWhereUniqueInput;
};


export type MutationUpdateLocationArgs = {
  updateLocationInput: UpdateLocationInput;
  where: LocationWhereUniqueInput;
};


export type MutationUpdatePaymentArgs = {
  updatePaymentInput: UpdatePaymentInput;
  where: PaymentWhereUniqueInput;
};


export type MutationUpdateRecentsoldArgs = {
  updateRecentsoldInput: UpdateRecentsoldInput;
  where: RecentsoldWhereUniqueInput;
};


export type MutationUpdateSellerArgs = {
  updateSellerInput: UpdateSellerInput;
  where: SellerWhereUniqueInput;
};


export type MutationUpdateStateArgs = {
  updateStateInput: UpdateStateInput;
  where: StateWhereUniqueInput;
};


export type MutationUpdateStatusArgs = {
  updateStatusInput: UpdateStatusInput;
  where: StatusWhereUniqueInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateVehicleArgs = {
  updateVehicleInput: UpdateVehicleInput;
  where: VehicleWhereUniqueInput;
};


export type MutationUpdateVehicleCategoryArgs = {
  updateVehiclecategoryInput: UpdateVehiclecategoryInput;
  where: VehicleCategoryWhereUniqueInput;
};


export type MutationVerifyOtpArgs = {
  verfiyOtpDto: VerfiyOtpDto;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OtpMessageDataDto = {
  __typename?: 'OtpMessageDataDto';
  messageid: Scalars['String'];
  totalcredit: Scalars['String'];
  totnumber: Scalars['String'];
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emdUpdate?: Maybe<Array<Emdupdate>>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  paymentFor?: Maybe<Scalars['String']>;
  refNo?: Maybe<Scalars['Float']>;
  registrationExpire?: Maybe<Scalars['DateTime']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
};

export enum PaymentStatusType {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum PaymentStatusTypes {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum PaymentType {
  Emd = 'emd',
  OpenBids = 'openBids',
  Registrations = 'registrations'
}

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Bid: Bid;
  Bids: Array<Bid>;
  Enquiries: Array<Enquiry>;
  Enquiry: Enquiry;
  State: State;
  States: Array<State>;
  completedEvents?: Maybe<Array<Event>>;
  deletedEnquiries: Array<Enquiry>;
  deletedEvent: Event;
  deletedEvents: Array<Event>;
  deletedLocation: Location;
  deletedLocations: Array<Location>;
  deletedPayment: Payment;
  deletedPayments: Array<Payment>;
  deletedSeller: Seller;
  deletedSellers: Array<Seller>;
  deletedState: State;
  deletedStates: Array<State>;
  deletedStatus: Status;
  deletedStatuses: Array<Status>;
  deletedUser?: Maybe<User>;
  deletedUsers: Array<Maybe<User>>;
  deletedVehicle: Vehicle;
  deletedVehicleCategories: Array<VehicleCategory>;
  deletedVehicleCategory: VehicleCategory;
  deletedVehicles: Array<Vehicle>;
  emdUpdate: Emdupdate;
  emdUpdates: Array<Emdupdate>;
  event: Event;
  events?: Maybe<EventListResponse>;
  eventsCount: Scalars['Int'];
  excelUpload: Excelupload;
  excelUploads: Array<Excelupload>;
  getAcr?: Maybe<Scalars['JSON']>;
  liveEvents?: Maybe<Array<Event>>;
  location: Location;
  locations: Array<Location>;
  locationsCount: Scalars['Int'];
  payment: Payment;
  payments: Array<Payment>;
  paymentsCount: Scalars['Int'];
  recentSold: Recentsold;
  recentSolds: Array<Recentsold>;
  restoreState: State;
  seller: Seller;
  sellers: Array<Seller>;
  sellersCount: Scalars['Int'];
  status: Status;
  statuses: Array<Status>;
  time: Scalars['String'];
  upcomingEvents?: Maybe<Array<Event>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount: Scalars['Int'];
  vehicle: Vehicle;
  vehicleCategories: Array<VehicleCategory>;
  vehicleCategory: VehicleCategory;
  vehicleCategoryCount: Scalars['Int'];
  vehicles?: Maybe<VehicleListResponse>;
  vehiclsCount: Scalars['Int'];
};


export type QueryBidArgs = {
  where: BidWhereUniqueInput;
};


export type QueryBidsArgs = {
  where: BidWhereUniqueInput;
};


export type QueryEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};


export type QueryStateArgs = {
  where: StateWhereUniqueInput;
};


export type QueryCompletedEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryDeletedEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryDeletedLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryDeletedPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryDeletedSellerArgs = {
  where: SellerWhereUniqueInput;
};


export type QueryDeletedStateArgs = {
  where: StateWhereUniqueInput;
};


export type QueryDeletedStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type QueryDeletedUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryDeletedVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryDeletedVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type QueryEmdUpdateArgs = {
  where: EmdUpdateWhereUniqueInput;
};


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryEventsArgs = {
  options?: InputMaybe<QueryOptionsType>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryExcelUploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type QueryGetAcrArgs = {
  eventId: Scalars['String'];
};


export type QueryLiveEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryRecentSoldArgs = {
  where: RecentsoldWhereUniqueInput;
};


export type QueryRestoreStateArgs = {
  where: StateWhereUniqueInput;
};


export type QuerySellerArgs = {
  where: SellerWhereUniqueInput;
};


export type QueryStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type QueryUpcomingEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryUserArgs = {
  sortOrder?: InputMaybe<Scalars['String']>;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereUniqueInput>;
};


export type QueryVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type QueryVehiclesArgs = {
  orderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VehicleWhereUniqueInput>;
};

export type QueryOptionsType = {
  enabled?: InputMaybe<Scalars['Boolean']>;
};

export type Recentsold = {
  __typename?: 'Recentsold';
  createdAt?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  soldDate?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  vehicleName?: Maybe<Scalars['String']>;
};

export type RecentsoldWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Seller = {
  __typename?: 'Seller';
  GSTNumber: Scalars['String'];
  billingContactPerson: Scalars['String'];
  contactPerson?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdById?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  logo: Scalars['String'];
  mobile: Scalars['String'];
  name: Scalars['String'];
  nationalHead: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SellerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SendOtpDto = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  mobile: Scalars['String'];
  pancardNo?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateNames>;
};

export type SendOtpResponse = {
  __typename?: 'SendOtpResponse';
  code: Scalars['String'];
  data?: Maybe<OtpMessageDataDto>;
  description: Scalars['String'];
  status: Scalars['String'];
};

export type State = {
  __typename?: 'State';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  location?: Maybe<Array<Location>>;
  name: StateNames;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum StateNames {
  AndhraPradesh = 'Andhra_Pradesh',
  ArunachalPradesh = 'Arunachal_Pradesh',
  Assam = 'Assam',
  Bihar = 'Bihar',
  Chhattisgarh = 'Chhattisgarh',
  Delhi = 'Delhi',
  Goa = 'Goa',
  Gujarat = 'Gujarat',
  Haryana = 'Haryana',
  HimachalPradesh = 'Himachal_Pradesh',
  JammuAndKashmir = 'Jammu_and_Kashmir',
  Jharkhand = 'Jharkhand',
  Karnataka = 'Karnataka',
  Kerala = 'Kerala',
  MadhyaPradesh = 'Madhya_Pradesh',
  Maharashtra = 'Maharashtra',
  Manipur = 'Manipur',
  Meghalaya = 'Meghalaya',
  Mizoram = 'Mizoram',
  Nagaland = 'Nagaland',
  Odisha = 'Odisha',
  Punjab = 'Punjab',
  Rajasthan = 'Rajasthan',
  Sikkim = 'Sikkim',
  TamilNadu = 'TamilNadu',
  Telangana = 'Telangana',
  Tripura = 'Tripura',
  UttarPradesh = 'Uttar_Pradesh',
  Uttarakhand = 'Uttarakhand',
  WestBengal = 'West_Bengal'
}

export type StateWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Status = {
  __typename?: 'Status';
  comment: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdById: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StatusWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  subscriptionBidCreation: Bid;
  subscriptionEventUpdates: Event;
  subscriptionUserUpdates: User;
  subscriptionVehicleUpdates: Vehicle;
};

export type UpdateBidInput = {
  amount: Scalars['Float'];
};

export type UpdateEmdupdateInput = {
  paymentId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  vehicleBuyingLimitIncrement?: InputMaybe<Scalars['Float']>;
};

export type UpdateEnquiryInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateNames>;
  status?: InputMaybe<ContactUsStatusType>;
};

export type UpdateEventInput = {
  bidLock: EventBidLockType;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  downloadableFile_filename?: InputMaybe<Scalars['String']>;
  downloadableFile_filesize?: InputMaybe<Scalars['Float']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  eventCategory: EventCategory;
  extraTime?: InputMaybe<Scalars['Float']>;
  extraTimeTrigerIn?: InputMaybe<Scalars['Float']>;
  firstVehicleEndDate?: InputMaybe<Scalars['DateTime']>;
  gapInBetweenVehicles?: InputMaybe<Scalars['Float']>;
  locationId?: InputMaybe<Scalars['String']>;
  noOfBids?: InputMaybe<Scalars['Float']>;
  pauseDate?: InputMaybe<Scalars['DateTime']>;
  pausedTotalTime?: InputMaybe<Scalars['Float']>;
  sellerId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status: EventStatusType;
  termsAndConditions?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  vehicleCategoryId?: InputMaybe<Scalars['String']>;
  vehicleLiveTimeIn?: InputMaybe<Scalars['Float']>;
};

export type UpdateLocationInput = {
  name?: InputMaybe<Scalars['String']>;
  stateId?: InputMaybe<Scalars['String']>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  paymentFor: PaymentType;
  registrationExpire?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<PaymentStatusType>;
};

export type UpdateRecentsoldInput = {
  image?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  soldDate?: InputMaybe<Scalars['String']>;
  vehicleName?: InputMaybe<Scalars['String']>;
};

export type UpdateSellerInput = {
  GSTNumber?: InputMaybe<Scalars['String']>;
  billingContactPerson?: InputMaybe<Scalars['String']>;
  contactPerson?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nationalHead?: InputMaybe<Scalars['String']>;
};

export type UpdateStateInput = {
  createdById?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<StateNames>;
};

export type UpdateStatusInput = {
  comment?: InputMaybe<Scalars['String']>;
  status: PaymentStatusTypes;
};

export type UpdateUserInput = {
  BalanceEMDAmount?: InputMaybe<Scalars['Float']>;
  businessName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  idProofNo?: InputMaybe<Scalars['String']>;
  idProofType?: InputMaybe<UserIdProofTypeType>;
  lastName?: InputMaybe<Scalars['String']>;
  mobile?: InputMaybe<Scalars['String']>;
  pancardNo?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRoleType>;
  state?: InputMaybe<StateNames>;
  states?: InputMaybe<Array<StateNames>>;
  status?: InputMaybe<UserStatusType>;
  tempToken?: InputMaybe<Scalars['Float']>;
  userCategory?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  watchList?: InputMaybe<WatchListUpdateInput>;
};

export type UpdateVehicleInput = {
  YOM?: InputMaybe<Scalars['Float']>;
  additionalRemarks?: InputMaybe<Scalars['String']>;
  approxParkingCharges?: InputMaybe<Scalars['String']>;
  area?: InputMaybe<Scalars['String']>;
  auctionManager?: InputMaybe<Scalars['String']>;
  autobseContact?: InputMaybe<Scalars['String']>;
  autobse_contact_person?: InputMaybe<Scalars['String']>;
  bidAmountUpdate?: InputMaybe<Scalars['Float']>;
  bidStartTime?: InputMaybe<Scalars['String']>;
  bidStatus?: InputMaybe<VehicleBidStatusType>;
  bidTimeExpire?: InputMaybe<Scalars['String']>;
  buyerFees?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
  chassisNo?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  clientContactNo?: InputMaybe<Scalars['String']>;
  clientContactPerson?: InputMaybe<Scalars['String']>;
  climateControl?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  currentBidAmount?: InputMaybe<Scalars['Float']>;
  dateOfRegistration?: InputMaybe<Scalars['String']>;
  doorCount?: InputMaybe<Scalars['Float']>;
  engineNo?: InputMaybe<Scalars['String']>;
  fitness?: InputMaybe<Scalars['String']>;
  fuel?: InputMaybe<Scalars['String']>;
  gearBox?: InputMaybe<Scalars['String']>;
  hypothication?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  inspectionLink?: InputMaybe<Scalars['String']>;
  insurance?: InputMaybe<Scalars['String']>;
  insuranceStatus?: InputMaybe<Scalars['String']>;
  insuranceValidTill?: InputMaybe<Scalars['String']>;
  kmReading?: InputMaybe<Scalars['Float']>;
  loanAgreementNo?: InputMaybe<Scalars['String']>;
  lotNumber?: InputMaybe<Scalars['Float']>;
  make?: InputMaybe<Scalars['String']>;
  mileage?: InputMaybe<Scalars['Float']>;
  model?: InputMaybe<Scalars['String']>;
  ownership?: InputMaybe<Scalars['Float']>;
  parkingCharges?: InputMaybe<Scalars['String']>;
  parkingRate?: InputMaybe<Scalars['String']>;
  paymentTerms?: InputMaybe<Scalars['String']>;
  permit?: InputMaybe<Scalars['String']>;
  powerSteering?: InputMaybe<Scalars['String']>;
  quoteIncreament?: InputMaybe<Scalars['Float']>;
  rcStatus?: InputMaybe<Scalars['String']>;
  registeredOwnerName?: InputMaybe<Scalars['String']>;
  registrationNumber?: InputMaybe<Scalars['String']>;
  repoDt?: InputMaybe<Scalars['String']>;
  reservePrice?: InputMaybe<Scalars['Float']>;
  rtoFine?: InputMaybe<Scalars['String']>;
  shape?: InputMaybe<Scalars['String']>;
  startBidAmount?: InputMaybe<Scalars['Float']>;
  startPrice?: InputMaybe<Scalars['Float']>;
  state?: InputMaybe<Scalars['String']>;
  tax?: InputMaybe<Scalars['String']>;
  taxValidityDate?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  varient?: InputMaybe<Scalars['String']>;
  vehicleCondition?: InputMaybe<Scalars['String']>;
  vehicleEventStatus?: InputMaybe<VehicleEventStatus>;
  vehicleRemarks?: InputMaybe<Scalars['String']>;
  veicleLocation?: InputMaybe<Scalars['String']>;
  yardLocation?: InputMaybe<Scalars['String']>;
};

export type UpdateVehiclecategoryInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  BalanceEMDAmount?: Maybe<Scalars['Float']>;
  aadharcard_back_image?: Maybe<Scalars['String']>;
  aadharcard_front_image?: Maybe<Scalars['String']>;
  activeBids?: Maybe<Array<Vehicle>>;
  bid?: Maybe<Array<Bid>>;
  businessName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  driving_license_back_image?: Maybe<Scalars['String']>;
  driving_license_front_image?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emdUpdates?: Maybe<Array<Emdupdate>>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  idNo: Scalars['Float'];
  idProofNo: Scalars['String'];
  idProofType: Scalars['String'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  pancardNo: Scalars['String'];
  pancard_image?: Maybe<Scalars['String']>;
  payments?: Maybe<Array<Payment>>;
  paymentsCount?: Maybe<Scalars['Int']>;
  role: Scalars['String'];
  state: Scalars['String'];
  states?: Maybe<Array<State>>;
  status: Scalars['String'];
  tempToken?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userCategory: Scalars['String'];
  username: Scalars['String'];
  vehicleBuyingLimit?: Maybe<Scalars['Int']>;
  watchList?: Maybe<Array<Vehicle>>;
};

export enum UserIdProofTypeType {
  Aadhar = 'Aadhar',
  DrivingLicense = 'DrivingLicense',
  Passport = 'Passport'
}

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  idNo?: InputMaybe<OrderDirection>;
};

export enum UserRoleType {
  Admin = 'admin',
  Dealer = 'dealer',
  Seller = 'seller',
  Staff = 'staff'
}

export enum UserStatusType {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive',
  Pending = 'pending'
}

export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  idNo?: InputMaybe<Scalars['Float']>;
  mobile?: InputMaybe<Scalars['String']>;
  pancardNo?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRoleType>;
  state?: InputMaybe<StateNames>;
  tempToken?: InputMaybe<Scalars['Float']>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  YOM?: Maybe<Scalars['Float']>;
  additionalRemarks?: Maybe<Scalars['String']>;
  approxParkingCharges?: Maybe<Scalars['String']>;
  area?: Maybe<Scalars['String']>;
  auctionManager?: Maybe<Scalars['String']>;
  autobseContact?: Maybe<Scalars['String']>;
  autobse_contact_person?: Maybe<Scalars['String']>;
  bidAmountUpdate?: Maybe<Scalars['Float']>;
  bidStartTime: Scalars['DateTime'];
  bidStatus?: Maybe<Scalars['String']>;
  bidTimeExpire: Scalars['DateTime'];
  buyerFees?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  chassisNo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  clientContactNo?: Maybe<Scalars['String']>;
  clientContactPerson?: Maybe<Scalars['String']>;
  climateControl?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  currentBidAmount?: Maybe<Scalars['Float']>;
  currentBidUser?: Maybe<User>;
  dateOfRegistration?: Maybe<Scalars['String']>;
  doorCount?: Maybe<Scalars['Float']>;
  engineNo?: Maybe<Scalars['String']>;
  event?: Maybe<Event>;
  fitness?: Maybe<Scalars['String']>;
  fuel?: Maybe<Scalars['String']>;
  gearBox?: Maybe<Scalars['String']>;
  hypothication?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  inspectionLink?: Maybe<Scalars['String']>;
  insurance?: Maybe<Scalars['String']>;
  insuranceStatus?: Maybe<Scalars['String']>;
  insuranceValidTill?: Maybe<Scalars['String']>;
  kmReading?: Maybe<Scalars['Float']>;
  loanAgreementNo: Scalars['String'];
  lotNumber?: Maybe<Scalars['Float']>;
  make?: Maybe<Scalars['String']>;
  mileage?: Maybe<Scalars['Float']>;
  model?: Maybe<Scalars['String']>;
  myBidRank?: Maybe<Scalars['Int']>;
  ownership?: Maybe<Scalars['Float']>;
  parkingCharges?: Maybe<Scalars['String']>;
  parkingRate?: Maybe<Scalars['String']>;
  paymentTerms?: Maybe<Scalars['String']>;
  permit?: Maybe<Scalars['String']>;
  powerSteering?: Maybe<Scalars['String']>;
  quoteIncreament?: Maybe<Scalars['Float']>;
  rcStatus?: Maybe<Scalars['String']>;
  registeredOwnerName?: Maybe<Scalars['String']>;
  registrationNumber: Scalars['String'];
  repoDt?: Maybe<Scalars['String']>;
  reservePrice?: Maybe<Scalars['Float']>;
  rtoFine?: Maybe<Scalars['String']>;
  shape?: Maybe<Scalars['String']>;
  startBidAmount?: Maybe<Scalars['Float']>;
  startPrice?: Maybe<Scalars['Float']>;
  state?: Maybe<Scalars['String']>;
  tax?: Maybe<Scalars['String']>;
  taxValidityDate?: Maybe<Scalars['String']>;
  totalBids?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userVehicleBids?: Maybe<Array<Bid>>;
  userVehicleBidsCount?: Maybe<Scalars['Int']>;
  varient?: Maybe<Scalars['String']>;
  vehicleCondition?: Maybe<Scalars['String']>;
  vehicleEventStatus?: Maybe<VehicleEventStatus>;
  vehicleIndexNo: Scalars['Float'];
  vehicleRemarks?: Maybe<Scalars['String']>;
  veicleLocation?: Maybe<Scalars['String']>;
  watchedBy?: Maybe<Array<User>>;
  watchedByCount?: Maybe<Scalars['Int']>;
  yardLocation?: Maybe<Scalars['String']>;
};

export enum VehicleBidStatusType {
  Approved = 'approved',
  Declined = 'declined',
  Fulfilled = 'fulfilled',
  Pending = 'pending'
}

export type VehicleCategory = {
  __typename?: 'VehicleCategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type VehicleCategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type VehicleListResponse = {
  __typename?: 'VehicleListResponse';
  vehicles: Array<Vehicle>;
  vehiclesCount: Scalars['Int'];
};

export type VehicleOrderByInput = {
  bidTimeExpire?: InputMaybe<OrderDirection>;
};

export type VehicleWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type VerfiyOtpDto = {
  mobile: Scalars['String'];
  otp: Scalars['String'];
};

export type VerifyOtpResponse = {
  __typename?: 'VerifyOtpResponse';
  access_token: Scalars['String'];
  user: User;
};

export type WatchListUpdateInput = {
  connect?: InputMaybe<Array<VehicleWhereUniqueInput>>;
  disconnect?: InputMaybe<Array<VehicleWhereUniqueInput>>;
};

export enum EventBidLockType {
  Locked = 'Locked',
  Unlocked = 'Unlocked'
}

export enum EventCategory {
  Online = 'online',
  Open = 'open'
}

export enum EventStatusType {
  Active = 'Active',
  Blocked = 'Blocked',
  Inactive = 'Inactive',
  Pause = 'Pause',
  Pending = 'Pending',
  Stop = 'Stop'
}

export enum VehicleEventStatus {
  Abnormal = 'abnormal',
  Completed = 'completed',
  Live = 'live',
  Upcoming = 'upcoming'
}

export type LoginUsingPasswordMutationVariables = Exact<{
  loginInput: LoginUserInput;
}>;


export type LoginUsingPasswordMutation = { __typename?: 'Mutation', login: { __typename: 'LoginResponse', access_token: string, user: { __typename?: 'User', firstName: string, lastName: string, id: string, username: string, role: string, status: string } } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type SendOtpMutationVariables = Exact<{
  sendOtpDto: SendOtpDto;
}>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'SendOtpResponse', status: string, description: string } };

export type VerifyOtpMutationVariables = Exact<{
  verfiyOtpDto: VerfiyOtpDto;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'VerifyOtpResponse', access_token: string, user: { __typename?: 'User', mobile: string, id: string, firstName: string, username: string, lastName: string, status: string, role: string } } };

export type CreateBidMutationVariables = Exact<{
  bidVehicleId: Scalars['String'];
  createBidInput: CreateBidInput;
}>;


export type CreateBidMutation = { __typename?: 'Mutation', createBid: { __typename?: 'Bid', amount: number, bidVehicleId: string, id: string, name: string, userId: string } };

export type CreateEnquiryMutationVariables = Exact<{
  createEnquiryInput: CreateEnquiryInput;
}>;


export type CreateEnquiryMutation = { __typename?: 'Mutation', createEnquiry: { __typename?: 'Enquiry', firstName: string, lastName: string, message: string, mobile: string, state: string, status: string } };

export type LiveEventsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<EventOrderByInput> | EventOrderByInput>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type LiveEventsQuery = { __typename?: 'Query', liveEvents?: Array<{ __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, createdById?: string | null, vehiclesCount?: number | null, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, firstVehicleEndDate: any, gapInBetweenVehicles?: number | null, id: string, noOfBids: number, pauseDate?: any | null, pausedTotalTime?: number | null, startDate: any, status?: string | null, termsAndConditions: string, updatedAt?: any | null, vehicleLiveTimeIn?: number | null, location?: { __typename?: 'Location', name: string, id: string } | null, seller?: { __typename?: 'Seller', name: string, mobile: string } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null }> | null };

export type UpcomingEventsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type UpcomingEventsQuery = { __typename?: 'Query', upcomingEvents?: Array<{ __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, vehiclesCount?: number | null, createdById?: string | null, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, firstVehicleEndDate: any, gapInBetweenVehicles?: number | null, id: string, noOfBids: number, pauseDate?: any | null, pausedTotalTime?: number | null, startDate: any, status?: string | null, termsAndConditions: string, updatedAt?: any | null, vehicleLiveTimeIn?: number | null, location?: { __typename?: 'Location', name: string } | null, seller?: { __typename?: 'Seller', mobile: string, name: string } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null }> | null };

export type GetEventsQueryVariables = Exact<{
  where: EventWhereUniqueInput;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<VehicleOrderByInput> | VehicleOrderByInput>;
}>;


export type GetEventsQuery = { __typename?: 'Query', event: { __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, vehiclesCount?: number | null, createdById?: string | null, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, firstVehicleEndDate: any, gapInBetweenVehicles?: number | null, id: string, noOfBids: number, pauseDate?: any | null, pausedTotalTime?: number | null, startDate: any, status?: string | null, termsAndConditions: string, vehicleLiveTimeIn?: number | null, location?: { __typename?: 'Location', name: string, id: string } | null, seller?: { __typename?: 'Seller', mobile: string, name: string, nationalHead: string, id: string, contactPerson?: string | null } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null, vehiclesTemp: Array<{ __typename?: 'Vehicle', YOM?: number | null, additionalRemarks?: string | null, approxParkingCharges?: string | null, area?: string | null, auctionManager?: string | null, autobseContact?: string | null, autobse_contact_person?: string | null, bidAmountUpdate?: number | null, bidStartTime: any, bidTimeExpire: any, buyerFees?: string | null, category?: string | null, chassisNo?: string | null, city?: string | null, clientContactNo?: string | null, clientContactPerson?: string | null, climateControl?: string | null, color?: string | null, createdAt?: any | null, createdById?: string | null, currentBidAmount?: number | null, dateOfRegistration?: string | null, doorCount?: number | null, engineNo?: string | null, fitness?: string | null, fuel?: string | null, gearBox?: string | null, hypothication?: string | null, id: string, image?: string | null, inspectionLink?: string | null, insurance?: string | null, insuranceStatus?: string | null, insuranceValidTill?: string | null, kmReading?: number | null, loanAgreementNo: string, lotNumber?: number | null, make?: string | null, mileage?: number | null, model?: string | null, ownership?: number | null, parkingCharges?: string | null, parkingRate?: string | null, paymentTerms?: string | null, permit?: string | null, powerSteering?: string | null, quoteIncreament?: number | null, rcStatus?: string | null, registeredOwnerName?: string | null, registrationNumber: string, repoDt?: string | null, reservePrice?: number | null, rtoFine?: string | null, shape?: string | null, startPrice?: number | null, startBidAmount?: number | null, updatedAt?: any | null, varient?: string | null, vehicleCondition?: string | null, vehicleIndexNo: number, vehicleRemarks?: string | null, veicleLocation?: string | null, yardLocation?: string | null, userVehicleBidsCount?: number | null, totalBids?: number | null, myBidRank?: number | null, userVehicleBids?: Array<{ __typename?: 'Bid', amount: number, userId: string, id: string, name: string, bidVehicleId: string }> | null, watchedBy?: Array<{ __typename?: 'User', id: string }> | null }> } };

export type TimeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TimeQueryQuery = { __typename?: 'Query', time: string };

export type EventsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsCountQuery = { __typename?: 'Query', events?: { __typename?: 'EventListResponse', upcomingEventCount?: number | null, liveEventCount?: number | null, totalEventsCount?: number | null, completedEventCount?: number | null, events?: Array<{ __typename?: 'Event', id: string }> | null } | null };

export type CreatePaymentMutationVariables = Exact<{
  createPaymentInput: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: string, refNo?: number | null, userId?: string | null } };

export type FindUserPaymentsQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type FindUserPaymentsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName: string, mobile: string, payments?: Array<{ __typename?: 'Payment', amount?: number | null, description?: string | null, id: string, image?: string | null, paymentFor?: string | null, refNo?: number | null, registrationExpire?: any | null, status?: string | null, userId?: string | null, createdAt?: any | null }> | null } | null };

export type VehicleUpdateSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type VehicleUpdateSubscription = { __typename?: 'Subscription', subscriptionVehicleUpdates: { __typename?: 'Vehicle', id: string } };

export type BidCreationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BidCreationSubscription = { __typename?: 'Subscription', subscriptionBidCreation: { __typename?: 'Bid', id: string } };

export type UserUpdateSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserUpdateSubscriptionSubscription = { __typename?: 'Subscription', subscriptionUserUpdates: { __typename?: 'User', id: string } };

export type EventsSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type EventsSubscriptionSubscription = { __typename?: 'Subscription', subscriptionEventUpdates: { __typename?: 'Event', id: string } };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, BalanceEMDAmount?: number | null, businessName: string, city: string, country: string, email: string, firstName: string, idNo: number, idProofNo: string, lastName: string, mobile: string, pancardNo: string, role: string, status: string, userCategory: string, idProofType: string, aadharcard_back_image?: string | null, aadharcard_front_image?: string | null, driving_license_back_image?: string | null, driving_license_front_image?: string | null, pancard_image?: string | null, username: string, state: string } };

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, lastName: string, BalanceEMDAmount?: number | null, firstName: string, pancardNo: string, mobile: string, state: string, vehicleBuyingLimit?: number | null, aadharcard_front_image?: string | null, aadharcard_back_image?: string | null, driving_license_back_image?: string | null, driving_license_front_image?: string | null, pancard_image?: string | null, email: string, createdAt?: any | null, idProofNo: string, city: string, country: string, payments?: Array<{ __typename?: 'Payment', id: string, paymentFor?: string | null, registrationExpire?: any | null, status?: string | null, amount?: number | null }> | null } | null };

export type GetVehicleQueryVariables = Exact<{
  where: VehicleWhereUniqueInput;
}>;


export type GetVehicleQuery = { __typename?: 'Query', vehicle: { __typename?: 'Vehicle', YOM?: number | null, additionalRemarks?: string | null, approxParkingCharges?: string | null, area?: string | null, auctionManager?: string | null, autobseContact?: string | null, autobse_contact_person?: string | null, bidAmountUpdate?: number | null, bidStartTime: any, bidTimeExpire: any, buyerFees?: string | null, category?: string | null, chassisNo?: string | null, city?: string | null, clientContactNo?: string | null, clientContactPerson?: string | null, climateControl?: string | null, color?: string | null, createdAt?: any | null, createdById?: string | null, currentBidAmount?: number | null, dateOfRegistration?: string | null, doorCount?: number | null, engineNo?: string | null, fitness?: string | null, fuel?: string | null, gearBox?: string | null, hypothication?: string | null, id: string, image?: string | null, inspectionLink?: string | null, insurance?: string | null, insuranceStatus?: string | null, insuranceValidTill?: string | null, kmReading?: number | null, loanAgreementNo: string, lotNumber?: number | null, make?: string | null, mileage?: number | null, model?: string | null, ownership?: number | null, parkingCharges?: string | null, parkingRate?: string | null, paymentTerms?: string | null, permit?: string | null, powerSteering?: string | null, quoteIncreament?: number | null, rcStatus?: string | null, registeredOwnerName?: string | null, registrationNumber: string, repoDt?: string | null, reservePrice?: number | null, rtoFine?: string | null, shape?: string | null, startPrice?: number | null, startBidAmount?: number | null, updatedAt?: any | null, varient?: string | null, vehicleCondition?: string | null, vehicleIndexNo: number, vehicleRemarks?: string | null, veicleLocation?: string | null, yardLocation?: string | null, userVehicleBidsCount?: number | null, totalBids?: number | null, myBidRank?: number | null, userVehicleBids?: Array<{ __typename?: 'Bid', amount: number, userId: string, id: string, name: string, bidVehicleId: string }> | null, event?: { __typename?: 'Event', startDate: any, noOfBids: number, gapInBetweenVehicles?: number | null, bidLock?: string | null, endDate: any, status?: string | null, eventNo: number, seller?: { __typename?: 'Seller', name: string, contactPerson?: string | null } | null } | null } };

export type AddToWatchlistMutationVariables = Exact<{
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
}>;


export type AddToWatchlistMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, watchList?: Array<{ __typename?: 'Vehicle', id: string }> | null } };

export type RemoveFromWatchlistMutationVariables = Exact<{
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
}>;


export type RemoveFromWatchlistMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, watchList?: Array<{ __typename?: 'Vehicle', id: string }> | null } };

export type UserWatchlistQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type UserWatchlistQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, watchList?: Array<{ __typename?: 'Vehicle', id: string, image?: string | null, YOM?: number | null, watchedByCount?: number | null, autobse_contact_person?: string | null, autobseContact?: string | null, userVehicleBidsCount?: number | null, bidAmountUpdate?: number | null, bidStartTime: any, bidStatus?: string | null, bidTimeExpire: any, reservePrice?: number | null, currentBidAmount?: number | null, dateOfRegistration?: string | null, doorCount?: number | null, engineNo?: string | null, fitness?: string | null, fuel?: string | null, gearBox?: string | null, hypothication?: string | null, inspectionLink?: string | null, kmReading?: number | null, loanAgreementNo: string, lotNumber?: number | null, make?: string | null, model?: string | null, myBidRank?: number | null, ownership?: number | null, quoteIncreament?: number | null, rcStatus?: string | null, registrationNumber: string, repoDt?: string | null, startBidAmount?: number | null, startPrice?: number | null, state?: string | null, totalBids?: number | null, varient?: string | null, vehicleCondition?: string | null, watchedBy?: Array<{ __typename?: 'User', id: string }> | null, currentBidUser?: { __typename?: 'User', id: string } | null, event?: { __typename?: 'Event', bidLock?: string | null, id: string, noOfBids: number, startDate: any, seller?: { __typename?: 'Seller', name: string } | null } | null, userVehicleBids?: Array<{ __typename?: 'Bid', amount: number, name: string, bidVehicleId: string, userId: string, bidVehicle?: { __typename?: 'Vehicle', currentBidAmount?: number | null } | null }> | null }> | null } | null };


export const LoginUsingPasswordDocument = gql`
    mutation LoginUsingPassword($loginInput: LoginUserInput!) {
  login(loginInput: $loginInput) {
    access_token
    __typename
    user {
      firstName
      lastName
      id
      username
      role
      status
    }
  }
}
    `;
export type LoginUsingPasswordMutationFn = Apollo.MutationFunction<LoginUsingPasswordMutation, LoginUsingPasswordMutationVariables>;

/**
 * __useLoginUsingPasswordMutation__
 *
 * To run a mutation, you first call `useLoginUsingPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUsingPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUsingPasswordMutation, { data, loading, error }] = useLoginUsingPasswordMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginUsingPasswordMutation(baseOptions?: Apollo.MutationHookOptions<LoginUsingPasswordMutation, LoginUsingPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUsingPasswordMutation, LoginUsingPasswordMutationVariables>(LoginUsingPasswordDocument, options);
      }
export type LoginUsingPasswordMutationHookResult = ReturnType<typeof useLoginUsingPasswordMutation>;
export type LoginUsingPasswordMutationResult = Apollo.MutationResult<LoginUsingPasswordMutation>;
export type LoginUsingPasswordMutationOptions = Apollo.BaseMutationOptions<LoginUsingPasswordMutation, LoginUsingPasswordMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SendOtpDocument = gql`
    mutation SendOtp($sendOtpDto: SendOtpDto!) {
  sendOtp(sendOtpDto: $sendOtpDto) {
    status
    description
  }
}
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      sendOtpDto: // value for 'sendOtpDto'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation verifyOtp($verfiyOtpDto: VerfiyOtpDto!) {
  verifyOtp(verfiyOtpDto: $verfiyOtpDto) {
    user {
      mobile
      id
      firstName
      username
      lastName
      status
      role
    }
    access_token
  }
}
    `;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      verfiyOtpDto: // value for 'verfiyOtpDto'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const CreateBidDocument = gql`
    mutation CreateBid($bidVehicleId: String!, $createBidInput: CreateBidInput!) {
  createBid(bidVehicleId: $bidVehicleId, createBidInput: $createBidInput) {
    amount
    bidVehicleId
    id
    name
    userId
  }
}
    `;
export type CreateBidMutationFn = Apollo.MutationFunction<CreateBidMutation, CreateBidMutationVariables>;

/**
 * __useCreateBidMutation__
 *
 * To run a mutation, you first call `useCreateBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBidMutation, { data, loading, error }] = useCreateBidMutation({
 *   variables: {
 *      bidVehicleId: // value for 'bidVehicleId'
 *      createBidInput: // value for 'createBidInput'
 *   },
 * });
 */
export function useCreateBidMutation(baseOptions?: Apollo.MutationHookOptions<CreateBidMutation, CreateBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBidMutation, CreateBidMutationVariables>(CreateBidDocument, options);
      }
export type CreateBidMutationHookResult = ReturnType<typeof useCreateBidMutation>;
export type CreateBidMutationResult = Apollo.MutationResult<CreateBidMutation>;
export type CreateBidMutationOptions = Apollo.BaseMutationOptions<CreateBidMutation, CreateBidMutationVariables>;
export const CreateEnquiryDocument = gql`
    mutation CreateEnquiry($createEnquiryInput: CreateEnquiryInput!) {
  createEnquiry(createEnquiryInput: $createEnquiryInput) {
    firstName
    lastName
    message
    mobile
    state
    status
  }
}
    `;
export type CreateEnquiryMutationFn = Apollo.MutationFunction<CreateEnquiryMutation, CreateEnquiryMutationVariables>;

/**
 * __useCreateEnquiryMutation__
 *
 * To run a mutation, you first call `useCreateEnquiryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEnquiryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEnquiryMutation, { data, loading, error }] = useCreateEnquiryMutation({
 *   variables: {
 *      createEnquiryInput: // value for 'createEnquiryInput'
 *   },
 * });
 */
export function useCreateEnquiryMutation(baseOptions?: Apollo.MutationHookOptions<CreateEnquiryMutation, CreateEnquiryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEnquiryMutation, CreateEnquiryMutationVariables>(CreateEnquiryDocument, options);
      }
export type CreateEnquiryMutationHookResult = ReturnType<typeof useCreateEnquiryMutation>;
export type CreateEnquiryMutationResult = Apollo.MutationResult<CreateEnquiryMutation>;
export type CreateEnquiryMutationOptions = Apollo.BaseMutationOptions<CreateEnquiryMutation, CreateEnquiryMutationVariables>;
export const LiveEventsDocument = gql`
    query LiveEvents($orderBy: [EventOrderByInput!], $take: Int, $skip: Int) {
  liveEvents(orderBy: $orderBy, take: $take, skip: $skip) {
    bidLock
    createdAt
    createdById
    vehiclesCount
    downloadableFile_filename
    endDate
    eventCategory
    eventNo
    extraTime
    extraTimeTrigerIn
    firstVehicleEndDate
    gapInBetweenVehicles
    id
    location {
      name
      id
    }
    noOfBids
    pauseDate
    pausedTotalTime
    seller {
      name
      mobile
    }
    startDate
    status
    termsAndConditions
    updatedAt
    vehicleCategory {
      name
    }
    vehicleLiveTimeIn
  }
}
    `;

/**
 * __useLiveEventsQuery__
 *
 * To run a query within a React component, call `useLiveEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiveEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiveEventsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useLiveEventsQuery(baseOptions?: Apollo.QueryHookOptions<LiveEventsQuery, LiveEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LiveEventsQuery, LiveEventsQueryVariables>(LiveEventsDocument, options);
      }
export function useLiveEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LiveEventsQuery, LiveEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LiveEventsQuery, LiveEventsQueryVariables>(LiveEventsDocument, options);
        }
export function useLiveEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LiveEventsQuery, LiveEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LiveEventsQuery, LiveEventsQueryVariables>(LiveEventsDocument, options);
        }
export type LiveEventsQueryHookResult = ReturnType<typeof useLiveEventsQuery>;
export type LiveEventsLazyQueryHookResult = ReturnType<typeof useLiveEventsLazyQuery>;
export type LiveEventsSuspenseQueryHookResult = ReturnType<typeof useLiveEventsSuspenseQuery>;
export type LiveEventsQueryResult = Apollo.QueryResult<LiveEventsQuery, LiveEventsQueryVariables>;
export const UpcomingEventsDocument = gql`
    query UpcomingEvents($take: Int, $skip: Int) {
  upcomingEvents(take: $take, skip: $skip) {
    bidLock
    createdAt
    vehiclesCount
    createdById
    downloadableFile_filename
    endDate
    eventCategory
    eventNo
    extraTime
    extraTimeTrigerIn
    firstVehicleEndDate
    gapInBetweenVehicles
    id
    location {
      name
    }
    noOfBids
    pauseDate
    pausedTotalTime
    seller {
      mobile
      name
    }
    startDate
    status
    termsAndConditions
    updatedAt
    vehicleCategory {
      name
    }
    vehicleLiveTimeIn
  }
}
    `;

/**
 * __useUpcomingEventsQuery__
 *
 * To run a query within a React component, call `useUpcomingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingEventsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useUpcomingEventsQuery(baseOptions?: Apollo.QueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
      }
export function useUpcomingEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
        }
export function useUpcomingEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
        }
export type UpcomingEventsQueryHookResult = ReturnType<typeof useUpcomingEventsQuery>;
export type UpcomingEventsLazyQueryHookResult = ReturnType<typeof useUpcomingEventsLazyQuery>;
export type UpcomingEventsSuspenseQueryHookResult = ReturnType<typeof useUpcomingEventsSuspenseQuery>;
export type UpcomingEventsQueryResult = Apollo.QueryResult<UpcomingEventsQuery, UpcomingEventsQueryVariables>;
export const GetEventsDocument = gql`
    query GetEvents($where: EventWhereUniqueInput!, $take: Int, $skip: Int, $orderBy: [VehicleOrderByInput!]) {
  event(where: $where) {
    bidLock
    createdAt
    vehiclesCount
    createdById
    downloadableFile_filename
    endDate
    eventCategory
    eventNo
    extraTime
    extraTimeTrigerIn
    firstVehicleEndDate
    gapInBetweenVehicles
    id
    location {
      name
      id
    }
    noOfBids
    pauseDate
    pausedTotalTime
    seller {
      mobile
      name
      nationalHead
      id
      contactPerson
    }
    startDate
    status
    termsAndConditions
    vehicleCategory {
      name
    }
    vehicleLiveTimeIn
    vehiclesTemp(take: $take, skip: $skip, orderBy: $orderBy) {
      YOM
      userVehicleBids {
        amount
        userId
        id
        name
        bidVehicleId
      }
      additionalRemarks
      approxParkingCharges
      area
      auctionManager
      autobseContact
      autobse_contact_person
      bidAmountUpdate
      bidStartTime
      bidTimeExpire
      buyerFees
      category
      chassisNo
      city
      clientContactNo
      clientContactPerson
      climateControl
      color
      createdAt
      createdById
      currentBidAmount
      dateOfRegistration
      doorCount
      engineNo
      fitness
      fuel
      gearBox
      hypothication
      id
      image
      inspectionLink
      insurance
      insuranceStatus
      insuranceValidTill
      kmReading
      loanAgreementNo
      lotNumber
      make
      mileage
      model
      ownership
      parkingCharges
      parkingRate
      paymentTerms
      permit
      powerSteering
      quoteIncreament
      rcStatus
      registeredOwnerName
      registrationNumber
      repoDt
      reservePrice
      rtoFine
      shape
      startPrice
      startBidAmount
      updatedAt
      varient
      vehicleCondition
      vehicleIndexNo
      vehicleRemarks
      veicleLocation
      watchedBy {
        id
      }
      yardLocation
      userVehicleBidsCount
      totalBids
      myBidRank
    }
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables> & ({ variables: GetEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const TimeQueryDocument = gql`
    query TimeQuery {
  time
}
    `;

/**
 * __useTimeQueryQuery__
 *
 * To run a query within a React component, call `useTimeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimeQueryQuery(baseOptions?: Apollo.QueryHookOptions<TimeQueryQuery, TimeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimeQueryQuery, TimeQueryQueryVariables>(TimeQueryDocument, options);
      }
export function useTimeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimeQueryQuery, TimeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimeQueryQuery, TimeQueryQueryVariables>(TimeQueryDocument, options);
        }
export function useTimeQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TimeQueryQuery, TimeQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TimeQueryQuery, TimeQueryQueryVariables>(TimeQueryDocument, options);
        }
export type TimeQueryQueryHookResult = ReturnType<typeof useTimeQueryQuery>;
export type TimeQueryLazyQueryHookResult = ReturnType<typeof useTimeQueryLazyQuery>;
export type TimeQuerySuspenseQueryHookResult = ReturnType<typeof useTimeQuerySuspenseQuery>;
export type TimeQueryQueryResult = Apollo.QueryResult<TimeQueryQuery, TimeQueryQueryVariables>;
export const EventsCountDocument = gql`
    query EventsCount {
  events {
    events {
      id
    }
    upcomingEventCount
    liveEventCount
    totalEventsCount
    completedEventCount
  }
}
    `;

/**
 * __useEventsCountQuery__
 *
 * To run a query within a React component, call `useEventsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsCountQuery(baseOptions?: Apollo.QueryHookOptions<EventsCountQuery, EventsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsCountQuery, EventsCountQueryVariables>(EventsCountDocument, options);
      }
export function useEventsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsCountQuery, EventsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsCountQuery, EventsCountQueryVariables>(EventsCountDocument, options);
        }
export function useEventsCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EventsCountQuery, EventsCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EventsCountQuery, EventsCountQueryVariables>(EventsCountDocument, options);
        }
export type EventsCountQueryHookResult = ReturnType<typeof useEventsCountQuery>;
export type EventsCountLazyQueryHookResult = ReturnType<typeof useEventsCountLazyQuery>;
export type EventsCountSuspenseQueryHookResult = ReturnType<typeof useEventsCountSuspenseQuery>;
export type EventsCountQueryResult = Apollo.QueryResult<EventsCountQuery, EventsCountQueryVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {
  createPayment(createPaymentInput: $createPaymentInput) {
    id
    refNo
    userId
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      createPaymentInput: // value for 'createPaymentInput'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const FindUserPaymentsDocument = gql`
    query findUserPayments($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    firstName
    mobile
    payments {
      amount
      description
      id
      image
      paymentFor
      refNo
      registrationExpire
      status
      userId
      createdAt
    }
  }
}
    `;

/**
 * __useFindUserPaymentsQuery__
 *
 * To run a query within a React component, call `useFindUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserPaymentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useFindUserPaymentsQuery(baseOptions: Apollo.QueryHookOptions<FindUserPaymentsQuery, FindUserPaymentsQueryVariables> & ({ variables: FindUserPaymentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>(FindUserPaymentsDocument, options);
      }
export function useFindUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>(FindUserPaymentsDocument, options);
        }
export function useFindUserPaymentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>(FindUserPaymentsDocument, options);
        }
export type FindUserPaymentsQueryHookResult = ReturnType<typeof useFindUserPaymentsQuery>;
export type FindUserPaymentsLazyQueryHookResult = ReturnType<typeof useFindUserPaymentsLazyQuery>;
export type FindUserPaymentsSuspenseQueryHookResult = ReturnType<typeof useFindUserPaymentsSuspenseQuery>;
export type FindUserPaymentsQueryResult = Apollo.QueryResult<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>;
export const VehicleUpdateDocument = gql`
    subscription VehicleUpdate {
  subscriptionVehicleUpdates {
    id
  }
}
    `;

/**
 * __useVehicleUpdateSubscription__
 *
 * To run a query within a React component, call `useVehicleUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useVehicleUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVehicleUpdateSubscription({
 *   variables: {
 *   },
 * });
 */
export function useVehicleUpdateSubscription(baseOptions?: Apollo.SubscriptionHookOptions<VehicleUpdateSubscription, VehicleUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<VehicleUpdateSubscription, VehicleUpdateSubscriptionVariables>(VehicleUpdateDocument, options);
      }
export type VehicleUpdateSubscriptionHookResult = ReturnType<typeof useVehicleUpdateSubscription>;
export type VehicleUpdateSubscriptionResult = Apollo.SubscriptionResult<VehicleUpdateSubscription>;
export const BidCreationDocument = gql`
    subscription BidCreation {
  subscriptionBidCreation {
    id
  }
}
    `;

/**
 * __useBidCreationSubscription__
 *
 * To run a query within a React component, call `useBidCreationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBidCreationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBidCreationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBidCreationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<BidCreationSubscription, BidCreationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BidCreationSubscription, BidCreationSubscriptionVariables>(BidCreationDocument, options);
      }
export type BidCreationSubscriptionHookResult = ReturnType<typeof useBidCreationSubscription>;
export type BidCreationSubscriptionResult = Apollo.SubscriptionResult<BidCreationSubscription>;
export const UserUpdateSubscriptionDocument = gql`
    subscription UserUpdateSubscription {
  subscriptionUserUpdates {
    id
  }
}
    `;

/**
 * __useUserUpdateSubscriptionSubscription__
 *
 * To run a query within a React component, call `useUserUpdateSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserUpdateSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserUpdateSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserUpdateSubscriptionSubscription, UserUpdateSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserUpdateSubscriptionSubscription, UserUpdateSubscriptionSubscriptionVariables>(UserUpdateSubscriptionDocument, options);
      }
export type UserUpdateSubscriptionSubscriptionHookResult = ReturnType<typeof useUserUpdateSubscriptionSubscription>;
export type UserUpdateSubscriptionSubscriptionResult = Apollo.SubscriptionResult<UserUpdateSubscriptionSubscription>;
export const EventsSubscriptionDocument = gql`
    subscription EventsSubscription {
  subscriptionEventUpdates {
    id
  }
}
    `;

/**
 * __useEventsSubscriptionSubscription__
 *
 * To run a query within a React component, call `useEventsSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventsSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsSubscriptionSubscription({
 *   variables: {
 *   },
 * });
 */
export function useEventsSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<EventsSubscriptionSubscription, EventsSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EventsSubscriptionSubscription, EventsSubscriptionSubscriptionVariables>(EventsSubscriptionDocument, options);
      }
export type EventsSubscriptionSubscriptionHookResult = ReturnType<typeof useEventsSubscriptionSubscription>;
export type EventsSubscriptionSubscriptionResult = Apollo.SubscriptionResult<EventsSubscriptionSubscription>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    id
    BalanceEMDAmount
    businessName
    city
    country
    email
    firstName
    idNo
    idProofNo
    lastName
    mobile
    pancardNo
    role
    status
    userCategory
    idProofType
    aadharcard_back_image
    aadharcard_front_image
    driving_license_back_image
    driving_license_front_image
    pancard_image
    username
    state
    status
    role
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetUserDocument = gql`
    query getUser($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    username
    lastName
    BalanceEMDAmount
    firstName
    pancardNo
    mobile
    state
    vehicleBuyingLimit
    aadharcard_front_image
    aadharcard_back_image
    driving_license_back_image
    driving_license_front_image
    pancard_image
    email
    createdAt
    payments {
      id
      paymentFor
      registrationExpire
      status
      amount
    }
    idProofNo
    city
    country
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetVehicleDocument = gql`
    query GetVehicle($where: VehicleWhereUniqueInput!) {
  vehicle(where: $where) {
    YOM
    userVehicleBids {
      amount
      userId
      id
      name
      bidVehicleId
    }
    additionalRemarks
    approxParkingCharges
    area
    auctionManager
    autobseContact
    autobse_contact_person
    bidAmountUpdate
    bidStartTime
    bidTimeExpire
    buyerFees
    category
    chassisNo
    city
    clientContactNo
    clientContactPerson
    climateControl
    color
    createdAt
    createdById
    currentBidAmount
    dateOfRegistration
    doorCount
    engineNo
    fitness
    fuel
    gearBox
    hypothication
    id
    image
    inspectionLink
    insurance
    insuranceStatus
    insuranceValidTill
    kmReading
    loanAgreementNo
    lotNumber
    make
    mileage
    model
    ownership
    parkingCharges
    parkingRate
    paymentTerms
    permit
    powerSteering
    quoteIncreament
    rcStatus
    registeredOwnerName
    registrationNumber
    repoDt
    reservePrice
    rtoFine
    shape
    startPrice
    startBidAmount
    updatedAt
    event {
      startDate
      noOfBids
      gapInBetweenVehicles
      bidLock
      endDate
      status
      eventNo
      seller {
        name
        contactPerson
      }
    }
    varient
    vehicleCondition
    vehicleIndexNo
    vehicleRemarks
    veicleLocation
    yardLocation
    userVehicleBidsCount
    totalBids
    myBidRank
  }
}
    `;

/**
 * __useGetVehicleQuery__
 *
 * To run a query within a React component, call `useGetVehicleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVehicleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVehicleQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetVehicleQuery(baseOptions: Apollo.QueryHookOptions<GetVehicleQuery, GetVehicleQueryVariables> & ({ variables: GetVehicleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVehicleQuery, GetVehicleQueryVariables>(GetVehicleDocument, options);
      }
export function useGetVehicleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVehicleQuery, GetVehicleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVehicleQuery, GetVehicleQueryVariables>(GetVehicleDocument, options);
        }
export function useGetVehicleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVehicleQuery, GetVehicleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVehicleQuery, GetVehicleQueryVariables>(GetVehicleDocument, options);
        }
export type GetVehicleQueryHookResult = ReturnType<typeof useGetVehicleQuery>;
export type GetVehicleLazyQueryHookResult = ReturnType<typeof useGetVehicleLazyQuery>;
export type GetVehicleSuspenseQueryHookResult = ReturnType<typeof useGetVehicleSuspenseQuery>;
export type GetVehicleQueryResult = Apollo.QueryResult<GetVehicleQuery, GetVehicleQueryVariables>;
export const AddToWatchlistDocument = gql`
    mutation AddToWatchlist($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    id
    watchList {
      id
    }
  }
}
    `;
export type AddToWatchlistMutationFn = Apollo.MutationFunction<AddToWatchlistMutation, AddToWatchlistMutationVariables>;

/**
 * __useAddToWatchlistMutation__
 *
 * To run a mutation, you first call `useAddToWatchlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWatchlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWatchlistMutation, { data, loading, error }] = useAddToWatchlistMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAddToWatchlistMutation(baseOptions?: Apollo.MutationHookOptions<AddToWatchlistMutation, AddToWatchlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToWatchlistMutation, AddToWatchlistMutationVariables>(AddToWatchlistDocument, options);
      }
export type AddToWatchlistMutationHookResult = ReturnType<typeof useAddToWatchlistMutation>;
export type AddToWatchlistMutationResult = Apollo.MutationResult<AddToWatchlistMutation>;
export type AddToWatchlistMutationOptions = Apollo.BaseMutationOptions<AddToWatchlistMutation, AddToWatchlistMutationVariables>;
export const RemoveFromWatchlistDocument = gql`
    mutation RemoveFromWatchlist($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    id
    watchList {
      id
    }
  }
}
    `;
export type RemoveFromWatchlistMutationFn = Apollo.MutationFunction<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>;

/**
 * __useRemoveFromWatchlistMutation__
 *
 * To run a mutation, you first call `useRemoveFromWatchlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromWatchlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromWatchlistMutation, { data, loading, error }] = useRemoveFromWatchlistMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRemoveFromWatchlistMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>(RemoveFromWatchlistDocument, options);
      }
export type RemoveFromWatchlistMutationHookResult = ReturnType<typeof useRemoveFromWatchlistMutation>;
export type RemoveFromWatchlistMutationResult = Apollo.MutationResult<RemoveFromWatchlistMutation>;
export type RemoveFromWatchlistMutationOptions = Apollo.BaseMutationOptions<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>;
export const UserWatchlistDocument = gql`
    query UserWatchlist($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    watchList {
      id
      image
      YOM
      watchedByCount
      autobse_contact_person
      autobseContact
      userVehicleBidsCount
      bidAmountUpdate
      bidStartTime
      bidStatus
      bidTimeExpire
      watchedBy {
        id
      }
      reservePrice
      currentBidAmount
      currentBidUser {
        id
      }
      dateOfRegistration
      doorCount
      engineNo
      event {
        bidLock
        id
        noOfBids
        startDate
        seller {
          name
        }
      }
      fitness
      fuel
      gearBox
      hypothication
      id
      image
      inspectionLink
      kmReading
      loanAgreementNo
      lotNumber
      make
      model
      myBidRank
      ownership
      quoteIncreament
      rcStatus
      registrationNumber
      repoDt
      startBidAmount
      startPrice
      state
      totalBids
      userVehicleBids {
        amount
        bidVehicle {
          currentBidAmount
        }
        name
        bidVehicleId
        userId
      }
      userVehicleBidsCount
      varient
      vehicleCondition
    }
  }
}
    `;

/**
 * __useUserWatchlistQuery__
 *
 * To run a query within a React component, call `useUserWatchlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWatchlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWatchlistQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserWatchlistQuery(baseOptions: Apollo.QueryHookOptions<UserWatchlistQuery, UserWatchlistQueryVariables> & ({ variables: UserWatchlistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserWatchlistQuery, UserWatchlistQueryVariables>(UserWatchlistDocument, options);
      }
export function useUserWatchlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserWatchlistQuery, UserWatchlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserWatchlistQuery, UserWatchlistQueryVariables>(UserWatchlistDocument, options);
        }
export function useUserWatchlistSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserWatchlistQuery, UserWatchlistQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserWatchlistQuery, UserWatchlistQueryVariables>(UserWatchlistDocument, options);
        }
export type UserWatchlistQueryHookResult = ReturnType<typeof useUserWatchlistQuery>;
export type UserWatchlistLazyQueryHookResult = ReturnType<typeof useUserWatchlistLazyQuery>;
export type UserWatchlistSuspenseQueryHookResult = ReturnType<typeof useUserWatchlistSuspenseQuery>;
export type UserWatchlistQueryResult = Apollo.QueryResult<UserWatchlistQuery, UserWatchlistQueryVariables>;