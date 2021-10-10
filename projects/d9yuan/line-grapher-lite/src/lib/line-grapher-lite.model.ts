/** Data Model for line-grapher-lite */ 
export interface LineGrapherData {
    /** variable to be graphed on x-axis
     *  supported types: string, number, Date
     */
    variable: Date[];
    /** name for x-variable (optional) */
    varName?: string;
    /** observations to be graphed as lines
     *  each element should contain data for a line
     */
    observations: number[][];
    /** names for observation */
    observationNames?: string[][];
}

/** Measurements for the graph */
export interface LineGrapherMeasurement {
    /** width in px */
    width: number;
    /** height in px */
    height: number;
    /** margin in px */
    margin: number;
}
