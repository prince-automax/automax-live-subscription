// Example error response (mock of the provided structure)
const errorResponse = {
    response: {
      errors: [
        {
          message: "Bid creation failed. Please try again later.",
          locations: [{ line: 3, column: 3 }],
          path: ["createBid"],
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            stacktrace: [
              "InternalServerErrorException: Bid creation failed. Please try again later.",
              " at BidService.createBid (/home/ubuntu/autobse-backend-nestjs/src/bid/bid.service.ts:246:13)",
              " at BidResolver.createBid (/home/ubuntu/autobse-backend-nestjs/src/bid/bid.resolver.ts:40:17)",
              " at target (/home/ubuntu/autobse-backend-nestjs/node_modules/@nestjs/core/helpers/external-context-creator.js:74:28)",
              " at Object.createBid (/home/ubuntu/autobse-backend-nestjs/node_modules/@nestjs/core/helpers/external-proxy.js:9:24)"
            ],
            status: 500,
            originalError: {
              statusCode: 500,
              error: "Internal Server Error",
              message: "Bid creation failed. Please try again later.",
              details: "Insufficient buying limit."
            }
          }
        }
      ],
      data: null,
      status: 200,
      headers: {
        map: {
          "cache-control": "no-store",
          "content-length": "895",
          "content-type": "application/json; charset=utf-8"
        }
      }
    },
    request: {
      query: `
      mutation CreateBid($bidVehicleId: String!, $createBidInput: CreateBidInput!) {
        createBid(bidVehicleId: $bidVehicleId, createBidInput: $createBidInput) {
          amount
          bidVehicleId
          id
          name
          userId
        }
      }
      `,
      variables: {
        bidVehicleId: "cm3s8qpex001hdtvn1cp6dx80",
        createBidInput: { amount: 11000 }
      }
    }
  };
  
  // Extracting the originalError
  const originalError = errorResponse.response?.errors?.[0]?.extensions?.originalError;
  
  if (originalError) {
    console.log("Original Error:", originalError);
  } else {
    console.log("Original Error not found");
  }
  