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
};

export enum ContactUsStatusType {
  Created = 'created',
  Solved = 'solved'
}

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
  state: StateNames;
};

export type CreatePaymentInput = {
  amount: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  paymentFor: PaymentType;
  status?: InputMaybe<PaymentStatusType>;
};

export type CreateRecentsoldInput = {
  image: Scalars['String'];
  location: Scalars['String'];
  soldDate: Scalars['DateTime'];
  vehicleName: Scalars['String'];
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
  mobile?: InputMaybe<Scalars['String']>;
  pancardNo?: InputMaybe<Scalars['String']>;
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

export type Enquiry = {
  __typename?: 'Enquiry';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
  mobile: Scalars['String'];
  state: Scalars['String'];
  status: Scalars['String'];
};

export type EnquiryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Event = {
  __typename?: 'Event';
  bidLock?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById: Scalars['String'];
  downloadableFile_filename?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  eventCategory: Scalars['String'];
  eventNo: Scalars['Float'];
  extraTime?: Maybe<Scalars['Float']>;
  extraTimeTrigerIn?: Maybe<Scalars['Float']>;
  firstVehicleEndDate: Scalars['DateTime'];
  gapInBetweenVehicles?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  locationId: Scalars['String'];
  noOfBids: Scalars['Float'];
  pauseDate?: Maybe<Scalars['DateTime']>;
  pausedTotalTime?: Maybe<Scalars['Float']>;
  sellerId: Scalars['String'];
  startDate: Scalars['DateTime'];
  status?: Maybe<Scalars['String']>;
  termsAndConditions: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  vehicleCategoryId: Scalars['String'];
  vehicleLiveTimeIn?: Maybe<Scalars['Float']>;
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
  state: Scalars['String'];
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
  createEnquiry: Enquiry;
  createEvent: Event;
  createExcelupload: Excelupload;
  createLocation: Location;
  createPayment: Payment;
  createRecentsold: Recentsold;
  createSeller: Seller;
  createStatus: Status;
  createUser: User;
  createVehicle: Vehicle;
  createVehiclecategory: VehicleCategory;
  deleteEnquiry: Enquiry;
  deleteEvent: Event;
  deleteExcelupload: Excelupload;
  deleteLocation: Location;
  deletePayment: Payment;
  deleteRecentsold: Recentsold;
  deleteSeller: Seller;
  deleteSellerHardDelete: Seller;
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
  updateEnquiry: Enquiry;
  updateEvent: Event;
  updateLocation: Location;
  updatePayment: Payment;
  updateRecentsold: Recentsold;
  updateSeller: Seller;
  updateStatus: Status;
  updateUser: User;
  updateVehicle: Vehicle;
  updateVehicleCategory: VehicleCategory;
  verifyOtp: VerifyOtpResponse;
};


export type MutationDeleteUserHardDeleteArgs = {
  where: UserWhereUniqueInput;
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
  createdById?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
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
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export enum PaymentStatusTypes {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum PaymentType {
  Emd = 'Emd',
  OpenBids = 'OpenBids',
  Registrations = 'Registrations'
}

export type PaymentWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  Enquiries: Array<Enquiry>;
  Enquiry: Enquiry;
  deletedEnquiries: Array<Enquiry>;
  deletedEvent: Event;
  deletedEvents: Array<Event>;
  deletedLocation: Location;
  deletedLocations: Array<Location>;
  deletedPayment: Payment;
  deletedPayments: Array<Payment>;
  deletedSeller: Seller;
  deletedSellers: Array<Seller>;
  deletedStatus: Status;
  deletedStatuses: Array<Status>;
  deletedUser?: Maybe<User>;
  deletedUsers: Array<Maybe<User>>;
  deletedVehicle: Vehicle;
  deletedVehicleCategories: Array<VehicleCategory>;
  deletedVehicleCategory: VehicleCategory;
  deletedVehicles: Array<Vehicle>;
  event: Event;
  events: Array<Event>;
  excelUpload: Excelupload;
  excelUploads: Array<Excelupload>;
  location: Location;
  locations: Array<Location>;
  payment: Payment;
  payments: Array<Payment>;
  recentSolds: Array<Recentsold>;
  seller: Seller;
  sellers: Array<Seller>;
  status: Status;
  statuses: Array<Status>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
  vehicle: Vehicle;
  vehicleCategories: Array<VehicleCategory>;
  vehicleCategory: VehicleCategory;
  vehicles: Array<Vehicle>;
};


export type QueryEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
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


export type QueryEventArgs = {
  where: EventWhereUniqueInput;
};


export type QueryExcelUploadArgs = {
  where: ExcelWhereUniqueInput;
};


export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};


export type QueryPaymentArgs = {
  where: PaymentWhereUniqueInput;
};


export type QuerySellerArgs = {
  where: SellerWhereUniqueInput;
};


export type QueryStatusArgs = {
  where: StatusWhereUniqueInput;
};


export type QueryUserArgs = {
  sortOrder?: InputMaybe<Scalars['String']>;
  where: UserWhereUniqueInput;
};


export type QueryVehicleArgs = {
  where: VehicleWhereUniqueInput;
};


export type QueryVehicleCategoryArgs = {
  where: VehicleCategoryWhereUniqueInput;
};

export type Recentsold = {
  __typename?: 'Recentsold';
  image: Scalars['String'];
  location: Scalars['String'];
  soldDate: Scalars['DateTime'];
  vehicleName: Scalars['String'];
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
  createdById: Scalars['String'];
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
  state?: InputMaybe<StateNames>;
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
  image: Scalars['String'];
  location: Scalars['String'];
  soldDate: Scalars['DateTime'];
  vehicleName: Scalars['String'];
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
  status?: InputMaybe<UserStatusType>;
  tempToken?: InputMaybe<Scalars['Float']>;
  userCategory?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
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
  businessName: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  driving_license_back_image?: Maybe<Scalars['String']>;
  driving_license_front_image?: Maybe<Scalars['String']>;
  email: Scalars['String'];
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
  role: Scalars['String'];
  state: Scalars['String'];
  status: Scalars['String'];
  tempToken?: Maybe<Scalars['Float']>;
  userCategory: Scalars['String'];
  username: Scalars['String'];
};

export enum UserIdProofTypeType {
  Aadhar = 'Aadhar',
  DrivingLicense = 'DrivingLicense',
  Passport = 'Passport'
}

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
  tempToken?: InputMaybe<Scalars['Float']>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  YOM?: Maybe<Scalars['Float']>;
  additionalRemarks: Scalars['String'];
  approxParkingCharges: Scalars['String'];
  area: Scalars['String'];
  auctionManager: Scalars['String'];
  autobseContact: Scalars['String'];
  autobse_contact_person: Scalars['String'];
  bidAmountUpdate?: Maybe<Scalars['Float']>;
  bidStartTime: Scalars['DateTime'];
  bidTimeExpire: Scalars['DateTime'];
  buyerFees: Scalars['String'];
  category: Scalars['String'];
  chassisNo: Scalars['String'];
  city: Scalars['String'];
  clientContactNo: Scalars['String'];
  clientContactPerson: Scalars['String'];
  climateControl: Scalars['String'];
  color: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  createdById?: Maybe<Scalars['String']>;
  currentBidAmount?: Maybe<Scalars['Float']>;
  dateOfRegistration?: Maybe<Scalars['String']>;
  doorCount?: Maybe<Scalars['Float']>;
  engineNo: Scalars['String'];
  fitness: Scalars['String'];
  fuel: Scalars['String'];
  gearBox: Scalars['String'];
  hypothication: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  inspectionLink: Scalars['String'];
  insurance: Scalars['String'];
  insuranceStatus: Scalars['String'];
  insuranceValidTill?: Maybe<Scalars['String']>;
  kmReading?: Maybe<Scalars['Float']>;
  loanAgreementNo: Scalars['String'];
  lotNumber?: Maybe<Scalars['Float']>;
  make: Scalars['String'];
  mileage?: Maybe<Scalars['Float']>;
  model: Scalars['String'];
  ownership?: Maybe<Scalars['Float']>;
  parkingCharges: Scalars['String'];
  parkingRate: Scalars['String'];
  paymentTerms: Scalars['String'];
  permit: Scalars['String'];
  powerSteering: Scalars['String'];
  quoteIncreament?: Maybe<Scalars['Float']>;
  rcStatus: Scalars['String'];
  registeredOwnerName: Scalars['String'];
  registrationNumber: Scalars['String'];
  repoDt?: Maybe<Scalars['String']>;
  reservePrice?: Maybe<Scalars['Float']>;
  rtoFine: Scalars['String'];
  shape: Scalars['String'];
  startBidAmount?: Maybe<Scalars['Float']>;
  startPrice?: Maybe<Scalars['Float']>;
  state: Scalars['String'];
  tax: Scalars['String'];
  taxValidityDate?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  varient: Scalars['String'];
  vehicleCondition: Scalars['String'];
  vehicleIndexNo: Scalars['Float'];
  vehicleRemarks: Scalars['String'];
  veicleLocation: Scalars['String'];
  yardLocation: Scalars['String'];
};

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

export enum EventBidLockType {
  Locked = 'Locked',
  Unlocked = 'Unlocked'
}

export enum EventCategory {
  Online = 'Online',
  Open = 'Open'
}

export enum EventStatusType {
  Active = 'Active',
  Blocked = 'Blocked',
  Inactive = 'Inactive',
  Pause = 'Pause',
  Pending = 'Pending',
  Stop = 'Stop'
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

export type CreateEnquiryMutationVariables = Exact<{
  createEnquiryInput: CreateEnquiryInput;
}>;


export type CreateEnquiryMutation = { __typename?: 'Mutation', createEnquiry: { __typename?: 'Enquiry', firstName: string, lastName: string, message: string, mobile: string, state: string, status: string } };

export type LiveEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type LiveEventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', bidLock?: string | null, createdAt?: any | null, createdById: string, downloadableFile_filename?: string | null, endDate: any, eventCategory: string, eventNo: number, extraTime?: number | null, extraTimeTrigerIn?: number | null, gapInBetweenVehicles?: number | null, id: string, locationId: string, noOfBids: number, pauseDate?: any | null, pausedTotalTime?: number | null, sellerId: string, startDate: any, status?: string | null, termsAndConditions: string, updatedAt?: any | null, vehicleCategoryId: string, vehicleLiveTimeIn?: number | null }> };

export type CreatePaymentMutationVariables = Exact<{
  createPaymentInput: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: string, refNo?: number | null, userId?: string | null } };

export type FindUserPaymentsQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type FindUserPaymentsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, firstName: string, mobile: string, payments?: Array<{ __typename?: 'Payment', amount?: number | null, description?: string | null, id: string, image?: string | null, paymentFor?: string | null, refNo?: number | null, registrationExpire?: any | null, status?: string | null, userId?: string | null, createdAt?: any | null }> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
  where: UserWhereUniqueInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, BalanceEMDAmount?: number | null, businessName: string, city: string, country: string, email: string, firstName: string, idNo: number, idProofNo: string, lastName: string, mobile: string, pancardNo: string, role: string, status: string, userCategory: string, idProofType: string, username: string, state: string } };

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, username: string, lastName: string, BalanceEMDAmount?: number | null, firstName: string, pancardNo: string, mobile: string, state: string, aadharcard_front_image?: string | null, aadharcard_back_image?: string | null, driving_license_back_image?: string | null, driving_license_front_image?: string | null, email: string, idProofNo: string, city: string } | null };


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
    query LiveEvents {
  events {
    bidLock
    createdAt
    createdById
    downloadableFile_filename
    endDate
    eventCategory
    eventNo
    extraTime
    extraTimeTrigerIn
    gapInBetweenVehicles
    id
    locationId
    noOfBids
    pauseDate
    pausedTotalTime
    sellerId
    startDate
    status
    termsAndConditions
    updatedAt
    vehicleCategoryId
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
export const UpdateUserDocument = `
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
    username
    state
    status
    role
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
    aadharcard_front_image
    aadharcard_back_image
    driving_license_back_image
    driving_license_front_image
    email
    idProofNo
    city
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