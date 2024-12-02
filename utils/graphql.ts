import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/src/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  //@ts-ignore
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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

export type BidOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type BidWhereUniqueInput = {
  bidVehicleId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
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
  id: Scalars['String'];
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
  deletedVehiclesCount?: Maybe<Scalars['Int']>;
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
  deletedVehiclesCount?: Maybe<Scalars['Int']>;
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
  endDate?: InputMaybe<Scalars['DateTime']>;
  eventCategory?: InputMaybe<EventCategory>;
  eventNo?: InputMaybe<Scalars['Float']>;
  id?: InputMaybe<Scalars['String']>;
  locationId?: InputMaybe<Scalars['String']>;
  sellerId?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  status?: InputMaybe<EventStatusType>;
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

export type IdFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
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
  resetUserPassword: User;
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


export type MutationResetUserPasswordArgs = {
  data: ResetPasswordInput;
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

export type PaymentOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  refNo?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
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
  userId?: InputMaybe<Scalars['String']>;
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
  deletedUserCount: Scalars['Int'];
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
  payments?: Maybe<Array<Payment>>;
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


export type QueryStatesArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryCompletedEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  search?: InputMaybe<Scalars['String']>;
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


export type QueryDeletedVehiclesArgs = {
  eventId: Scalars['String'];
};


export type QueryEmdUpdateArgs = {
  where: EmdUpdateWhereUniqueInput;
};


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  search?: InputMaybe<Scalars['String']>;
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
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EventWhereUniqueInput>;
};


export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryLocationsArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QueryPaymentsArgs = {
  orderBy?: InputMaybe<Array<PaymentOrderByInput>>;
  search?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<PaymentWhereUniqueInput>;
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


export type QuerySellersArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type QueryUpcomingEventsArgs = {
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  search?: InputMaybe<Scalars['String']>;
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
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereUniqueInput>;
};


export type QueryVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryVehicleCategoriesArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};


export type QueryVehiclesArgs = {
  orderBy?: InputMaybe<Array<BidOrderByInput>>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  vehiclesOrderBy?: InputMaybe<Array<VehicleOrderByInput>>;
  where?: InputMaybe<VehicleWhereUniqueInput>;
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

export type ResetPasswordInput = {
  password: Scalars['String'];
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
  forSignin: Scalars['Boolean'];
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
  createdAt?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type VehicleWhereUniqueInput = {
  bidTimeExpire?: InputMaybe<IdFilter>;
  id?: InputMaybe<Scalars['String']>;
  userVehicleBids?: InputMaybe<BidWhereUniqueInput>;
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

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetUserPassword: { __typename?: 'User', id: string, status: string, firstName: string, username: string } };

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
  search?: InputMaybe<Scalars['String']>;
}>;


export type LiveEventsQuery = { __typename?: 'Query', liveEvents?: Array<{ __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, createdById?: string | null, vehiclesCount?: number | null, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, firstVehicleEndDate: any, gapInBetweenVehicles?: number | null, id: string, noOfBids: number, pauseDate?: any | null, pausedTotalTime?: number | null, startDate: any, status?: string | null, termsAndConditions: string, updatedAt?: any | null, vehicleLiveTimeIn?: number | null, location?: { __typename?: 'Location', name: string, id: string } | null, seller?: { __typename?: 'Seller', name: string, mobile: string } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null }> | null };

export type UpcomingEventsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type UpcomingEventsQuery = { __typename?: 'Query', upcomingEvents?: Array<{ __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, vehiclesCount?: number | null, createdById?: string | null, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, firstVehicleEndDate: any, gapInBetweenVehicles?: number | null, id: string, noOfBids: number, pauseDate?: any | null, pausedTotalTime?: number | null, startDate: any, status?: string | null, termsAndConditions: string, updatedAt?: any | null, vehicleLiveTimeIn?: number | null, location?: { __typename?: 'Location', name: string } | null, seller?: { __typename?: 'Seller', mobile: string, name: string } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null }> | null };

export type CompletedEventsQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Array<EventOrderByInput> | EventOrderByInput>;
}>;


export type CompletedEventsQuery = { __typename?: 'Query', completedEvents?: Array<{ __typename?: 'Event', eventNo: number, startDate: any, vehiclesCount?: number | null, eventCategory: string, firstVehicleEndDate: any, id: string, downloadableFile_filename?: string | null, seller?: { __typename?: 'Seller', name: string, id: string, mobile: string } | null, location?: { __typename?: 'Location', name: string, id: string, state?: { __typename?: 'State', name: StateNames } | null } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null }> | null };

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

export type MyQuotesQueryVariables = Exact<{
  where?: InputMaybe<VehicleWhereUniqueInput>;
  orderBy?: InputMaybe<Array<BidOrderByInput> | BidOrderByInput>;
  vehiclesOrderBy?: InputMaybe<Array<VehicleOrderByInput> | VehicleOrderByInput>;
}>;


export type MyQuotesQuery = { __typename?: 'Query', vehicles?: { __typename?: 'VehicleListResponse', vehicles: Array<{ __typename?: 'Vehicle', registrationNumber: string, type?: string | null, category?: string | null, fuel?: string | null, varient?: string | null, make?: string | null, registeredOwnerName?: string | null, model?: string | null, rcStatus?: string | null, bidStatus?: string | null, bidTimeExpire: any, id: string, YOM?: number | null, ownership?: number | null, kmReading?: number | null, insuranceStatus?: string | null, yardLocation?: string | null, engineNo?: string | null, chassisNo?: string | null, event?: { __typename?: 'Event', eventNo: number, eventCategory: string, startDate: any, endDate: any, seller?: { __typename?: 'Seller', name: string } | null, vehicleCategory?: { __typename?: 'VehicleCategory', name: string } | null, location?: { __typename?: 'Location', state?: { __typename?: 'State', name: StateNames } | null } | null } | null, userVehicleBids?: Array<{ __typename?: 'Bid', id: string, amount: number, bidVehicle?: { __typename?: 'Vehicle', id: string, currentBidUser?: { __typename?: 'User', id: string } | null } | null }> | null }> } | null };

export type UpdateVehicleMutationVariables = Exact<{
  where: VehicleWhereUniqueInput;
  updateVehicleInput: UpdateVehicleInput;
}>;


export type UpdateVehicleMutation = { __typename?: 'Mutation', updateVehicle: { __typename?: 'Vehicle', id: string } };

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

export type UserPaymentsQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Array<PaymentOrderByInput> | PaymentOrderByInput>;
}>;


export type UserPaymentsQuery = { __typename?: 'Query', payments?: Array<{ __typename?: 'Payment', amount?: number | null, createdAt?: any | null, description?: string | null, image?: string | null, paymentFor?: string | null, status?: string | null, user?: { __typename?: 'User', firstName: string } | null }> | null };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, city: string, country: string, email: string, firstName: string, lastName: string, mobile: string, username: string, state: string, status: string } };

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


export type UserWatchlistQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, watchList?: Array<{ __typename?: 'Vehicle', id: string, image?: string | null, YOM?: number | null, watchedByCount?: number | null, autobse_contact_person?: string | null, autobseContact?: string | null, userVehicleBidsCount?: number | null, bidAmountUpdate?: number | null, bidStartTime: any, bidStatus?: string | null, bidTimeExpire: any, reservePrice?: number | null, currentBidAmount?: number | null, dateOfRegistration?: string | null, doorCount?: number | null, engineNo?: string | null, fitness?: string | null, fuel?: string | null, gearBox?: string | null, hypothication?: string | null, inspectionLink?: string | null, kmReading?: number | null, loanAgreementNo: string, lotNumber?: number | null, make?: string | null, model?: string | null, myBidRank?: number | null, ownership?: number | null, quoteIncreament?: number | null, rcStatus?: string | null, registrationNumber: string, repoDt?: string | null, startBidAmount?: number | null, startPrice?: number | null, state?: string | null, vehicleEventStatus?: VehicleEventStatus | null, totalBids?: number | null, varient?: string | null, vehicleCondition?: string | null, watchedBy?: Array<{ __typename?: 'User', id: string }> | null, currentBidUser?: { __typename?: 'User', id: string } | null, event?: { __typename?: 'Event', bidLock?: string | null, id: string, noOfBids: number, startDate: any, seller?: { __typename?: 'Seller', name: string } | null } | null, userVehicleBids?: Array<{ __typename?: 'Bid', amount: number, name: string, bidVehicleId: string, userId: string, bidVehicle?: { __typename?: 'Vehicle', currentBidAmount?: number | null } | null }> | null }> | null } | null };


export const LoginUsingPasswordDocument = `
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
export const useLoginUsingPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUsingPasswordMutation, TError, LoginUsingPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUsingPasswordMutation, TError, LoginUsingPasswordMutationVariables, TContext>(
      ['LoginUsingPassword'],
      (variables?: LoginUsingPasswordMutationVariables) => fetcher<LoginUsingPasswordMutation, LoginUsingPasswordMutationVariables>(client, LoginUsingPasswordDocument, variables, headers)(),
      options
    );
export const CreateUserDocument = `
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export const useCreateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateUserMutation, TError, CreateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateUserMutation, TError, CreateUserMutationVariables, TContext>(
      ['CreateUser'],
      (variables?: CreateUserMutationVariables) => fetcher<CreateUserMutation, CreateUserMutationVariables>(client, CreateUserDocument, variables, headers)(),
      options
    );
export const SendOtpDocument = `
    mutation SendOtp($sendOtpDto: SendOtpDto!) {
  sendOtp(sendOtpDto: $sendOtpDto) {
    status
    description
  }
}
    `;
export const useSendOtpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SendOtpMutation, TError, SendOtpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SendOtpMutation, TError, SendOtpMutationVariables, TContext>(
      ['SendOtp'],
      (variables?: SendOtpMutationVariables) => fetcher<SendOtpMutation, SendOtpMutationVariables>(client, SendOtpDocument, variables, headers)(),
      options
    );
export const VerifyOtpDocument = `
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
export const useVerifyOtpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<VerifyOtpMutation, TError, VerifyOtpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<VerifyOtpMutation, TError, VerifyOtpMutationVariables, TContext>(
      ['verifyOtp'],
      (variables?: VerifyOtpMutationVariables) => fetcher<VerifyOtpMutation, VerifyOtpMutationVariables>(client, VerifyOtpDocument, variables, headers)(),
      options
    );
export const ResetPasswordDocument = `
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetUserPassword(data: $data) {
    id
    status
    firstName
    username
  }
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ResetPasswordMutation, TError, ResetPasswordMutationVariables, TContext>(
      ['ResetPassword'],
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutation, ResetPasswordMutationVariables>(client, ResetPasswordDocument, variables, headers)(),
      options
    );
export const CreateBidDocument = `
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
export const useCreateBidMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateBidMutation, TError, CreateBidMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateBidMutation, TError, CreateBidMutationVariables, TContext>(
      ['CreateBid'],
      (variables?: CreateBidMutationVariables) => fetcher<CreateBidMutation, CreateBidMutationVariables>(client, CreateBidDocument, variables, headers)(),
      options
    );
export const CreateEnquiryDocument = `
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
export const useCreateEnquiryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateEnquiryMutation, TError, CreateEnquiryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateEnquiryMutation, TError, CreateEnquiryMutationVariables, TContext>(
      ['CreateEnquiry'],
      (variables?: CreateEnquiryMutationVariables) => fetcher<CreateEnquiryMutation, CreateEnquiryMutationVariables>(client, CreateEnquiryDocument, variables, headers)(),
      options
    );
export const LiveEventsDocument = `
    query LiveEvents($orderBy: [EventOrderByInput!], $take: Int, $skip: Int, $search: String) {
  liveEvents(orderBy: $orderBy, take: $take, skip: $skip, search: $search) {
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
export const useLiveEventsQuery = <
      TData = LiveEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LiveEventsQueryVariables,
      options?: UseQueryOptions<LiveEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LiveEventsQuery, TError, TData>(
      variables === undefined ? ['LiveEvents'] : ['LiveEvents', variables],
      fetcher<LiveEventsQuery, LiveEventsQueryVariables>(client, LiveEventsDocument, variables, headers),
      options
    );
export const UpcomingEventsDocument = `
    query UpcomingEvents($take: Int, $skip: Int, $search: String) {
  upcomingEvents(take: $take, skip: $skip, search: $search) {
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
export const useUpcomingEventsQuery = <
      TData = UpcomingEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UpcomingEventsQueryVariables,
      options?: UseQueryOptions<UpcomingEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UpcomingEventsQuery, TError, TData>(
      variables === undefined ? ['UpcomingEvents'] : ['UpcomingEvents', variables],
      fetcher<UpcomingEventsQuery, UpcomingEventsQueryVariables>(client, UpcomingEventsDocument, variables, headers),
      options
    );
export const CompletedEventsDocument = `
    query CompletedEvents($take: Int, $skip: Int, $search: String, $orderBy: [EventOrderByInput!]) {
  completedEvents(take: $take, skip: $skip, search: $search, orderBy: $orderBy) {
    eventNo
    startDate
    seller {
      name
      id
      mobile
    }
    vehiclesCount
    eventCategory
    location {
      name
      id
      state {
        name
      }
    }
    firstVehicleEndDate
    id
    vehicleCategory {
      name
    }
    downloadableFile_filename
  }
}
    `;
export const useCompletedEventsQuery = <
      TData = CompletedEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: CompletedEventsQueryVariables,
      options?: UseQueryOptions<CompletedEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<CompletedEventsQuery, TError, TData>(
      variables === undefined ? ['CompletedEvents'] : ['CompletedEvents', variables],
      fetcher<CompletedEventsQuery, CompletedEventsQueryVariables>(client, CompletedEventsDocument, variables, headers),
      options
    );
export const GetEventsDocument = `
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
export const useGetEventsQuery = <
      TData = GetEventsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetEventsQueryVariables,
      options?: UseQueryOptions<GetEventsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetEventsQuery, TError, TData>(
      ['GetEvents', variables],
      fetcher<GetEventsQuery, GetEventsQueryVariables>(client, GetEventsDocument, variables, headers),
      options
    );
export const TimeQueryDocument = `
    query TimeQuery {
  time
}
    `;
export const useTimeQueryQuery = <
      TData = TimeQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: TimeQueryQueryVariables,
      options?: UseQueryOptions<TimeQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<TimeQueryQuery, TError, TData>(
      variables === undefined ? ['TimeQuery'] : ['TimeQuery', variables],
      fetcher<TimeQueryQuery, TimeQueryQueryVariables>(client, TimeQueryDocument, variables, headers),
      options
    );
export const EventsCountDocument = `
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
export const useEventsCountQuery = <
      TData = EventsCountQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: EventsCountQueryVariables,
      options?: UseQueryOptions<EventsCountQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<EventsCountQuery, TError, TData>(
      variables === undefined ? ['EventsCount'] : ['EventsCount', variables],
      fetcher<EventsCountQuery, EventsCountQueryVariables>(client, EventsCountDocument, variables, headers),
      options
    );
export const MyQuotesDocument = `
    query MyQuotes($where: VehicleWhereUniqueInput, $orderBy: [BidOrderByInput!], $vehiclesOrderBy: [VehicleOrderByInput!]) {
  vehicles(where: $where, orderBy: $orderBy, vehiclesOrderBy: $vehiclesOrderBy) {
    vehicles {
      registrationNumber
      event {
        eventNo
        seller {
          name
        }
        vehicleCategory {
          name
        }
        eventCategory
        startDate
        endDate
        location {
          state {
            name
          }
        }
      }
      type
      category
      fuel
      varient
      make
      registeredOwnerName
      model
      rcStatus
      bidStatus
      bidTimeExpire
      id
      YOM
      ownership
      kmReading
      insuranceStatus
      yardLocation
      engineNo
      chassisNo
      userVehicleBids {
        id
        amount
        bidVehicle {
          id
          currentBidUser {
            id
          }
        }
      }
    }
  }
}
    `;
export const useMyQuotesQuery = <
      TData = MyQuotesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MyQuotesQueryVariables,
      options?: UseQueryOptions<MyQuotesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MyQuotesQuery, TError, TData>(
      variables === undefined ? ['MyQuotes'] : ['MyQuotes', variables],
      fetcher<MyQuotesQuery, MyQuotesQueryVariables>(client, MyQuotesDocument, variables, headers),
      options
    );
export const UpdateVehicleDocument = `
    mutation UpdateVehicle($where: VehicleWhereUniqueInput!, $updateVehicleInput: UpdateVehicleInput!) {
  updateVehicle(where: $where, updateVehicleInput: $updateVehicleInput) {
    id
  }
}
    `;
export const useUpdateVehicleMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateVehicleMutation, TError, UpdateVehicleMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateVehicleMutation, TError, UpdateVehicleMutationVariables, TContext>(
      ['UpdateVehicle'],
      (variables?: UpdateVehicleMutationVariables) => fetcher<UpdateVehicleMutation, UpdateVehicleMutationVariables>(client, UpdateVehicleDocument, variables, headers)(),
      options
    );
export const CreatePaymentDocument = `
    mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {
  createPayment(createPaymentInput: $createPaymentInput) {
    id
    refNo
    userId
  }
}
    `;
export const useCreatePaymentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePaymentMutation, TError, CreatePaymentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePaymentMutation, TError, CreatePaymentMutationVariables, TContext>(
      ['CreatePayment'],
      (variables?: CreatePaymentMutationVariables) => fetcher<CreatePaymentMutation, CreatePaymentMutationVariables>(client, CreatePaymentDocument, variables, headers)(),
      options
    );
export const FindUserPaymentsDocument = `
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
export const useFindUserPaymentsQuery = <
      TData = FindUserPaymentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: FindUserPaymentsQueryVariables,
      options?: UseQueryOptions<FindUserPaymentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<FindUserPaymentsQuery, TError, TData>(
      ['findUserPayments', variables],
      fetcher<FindUserPaymentsQuery, FindUserPaymentsQueryVariables>(client, FindUserPaymentsDocument, variables, headers),
      options
    );
export const VehicleUpdateDocument = `
    subscription VehicleUpdate {
  subscriptionVehicleUpdates {
    id
  }
}
    `;
export const BidCreationDocument = `
    subscription BidCreation {
  subscriptionBidCreation {
    id
  }
}
    `;
export const UserUpdateSubscriptionDocument = `
    subscription UserUpdateSubscription {
  subscriptionUserUpdates {
    id
  }
}
    `;
export const EventsSubscriptionDocument = `
    subscription EventsSubscription {
  subscriptionEventUpdates {
    id
  }
}
    `;
export const UserPaymentsDocument = `
    query UserPayments($search: String, $orderBy: [PaymentOrderByInput!]) {
  payments(search: $search, orderBy: $orderBy) {
    amount
    createdAt
    description
    image
    paymentFor
    status
    user {
      firstName
    }
  }
}
    `;
export const useUserPaymentsQuery = <
      TData = UserPaymentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: UserPaymentsQueryVariables,
      options?: UseQueryOptions<UserPaymentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserPaymentsQuery, TError, TData>(
      variables === undefined ? ['UserPayments'] : ['UserPayments', variables],
      fetcher<UserPaymentsQuery, UserPaymentsQueryVariables>(client, UserPaymentsDocument, variables, headers),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    id
    city
    country
    email
    firstName
    lastName
    mobile
    username
    state
    status
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
export const GetUserDocument = `
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
export const useGetUserQuery = <
      TData = GetUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetUserQueryVariables,
      options?: UseQueryOptions<GetUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetUserQuery, TError, TData>(
      ['getUser', variables],
      fetcher<GetUserQuery, GetUserQueryVariables>(client, GetUserDocument, variables, headers),
      options
    );
export const GetVehicleDocument = `
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
export const useGetVehicleQuery = <
      TData = GetVehicleQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetVehicleQueryVariables,
      options?: UseQueryOptions<GetVehicleQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetVehicleQuery, TError, TData>(
      ['GetVehicle', variables],
      fetcher<GetVehicleQuery, GetVehicleQueryVariables>(client, GetVehicleDocument, variables, headers),
      options
    );
export const AddToWatchlistDocument = `
    mutation AddToWatchlist($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    id
    watchList {
      id
    }
  }
}
    `;
export const useAddToWatchlistMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddToWatchlistMutation, TError, AddToWatchlistMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddToWatchlistMutation, TError, AddToWatchlistMutationVariables, TContext>(
      ['AddToWatchlist'],
      (variables?: AddToWatchlistMutationVariables) => fetcher<AddToWatchlistMutation, AddToWatchlistMutationVariables>(client, AddToWatchlistDocument, variables, headers)(),
      options
    );
export const RemoveFromWatchlistDocument = `
    mutation RemoveFromWatchlist($data: UpdateUserInput!, $where: UserWhereUniqueInput!) {
  updateUser(data: $data, where: $where) {
    id
    watchList {
      id
    }
  }
}
    `;
export const useRemoveFromWatchlistMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RemoveFromWatchlistMutation, TError, RemoveFromWatchlistMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RemoveFromWatchlistMutation, TError, RemoveFromWatchlistMutationVariables, TContext>(
      ['RemoveFromWatchlist'],
      (variables?: RemoveFromWatchlistMutationVariables) => fetcher<RemoveFromWatchlistMutation, RemoveFromWatchlistMutationVariables>(client, RemoveFromWatchlistDocument, variables, headers)(),
      options
    );
export const UserWatchlistDocument = `
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
      vehicleEventStatus
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
export const useUserWatchlistQuery = <
      TData = UserWatchlistQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: UserWatchlistQueryVariables,
      options?: UseQueryOptions<UserWatchlistQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<UserWatchlistQuery, TError, TData>(
      ['UserWatchlist', variables],
      fetcher<UserWatchlistQuery, UserWatchlistQueryVariables>(client, UserWatchlistDocument, variables, headers),
      options
    );