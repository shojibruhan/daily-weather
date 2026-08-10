import z from "zod";
export const ReverseGeocodeSchema = z.array(
  z.object({
    name: z.string(),
    local_names: z.record(z.string(), z.string()).optional(),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string().optional(),
  }),
);

export type ReverseGeocodeDataType = z.infer<typeof ReverseGeocodeSchema>;
