# Muscat Bay - Asset & Resource Management (MB-AR)

## Project Overview

The MB-AR project is a comprehensive asset and resource management system designed specifically for Muscat Bay. This dashboard provides powerful monitoring and analytics capabilities for various utilities and resources, including water, electricity, and more.

## Water Analysis Module

The Water Analysis module provides detailed insights into water consumption, distribution, and efficiency across different zones in Muscat Bay.

### Key Features

#### Water Dashboard
- Comprehensive overview of water supply, distribution, and consumption (L1, L2, L3 levels)
- System efficiency metrics and trends
- Zone performance visualization using radar charts
- Loss distribution analysis with animated progress bars

#### Bulk Meters Analysis
- Detailed consumption data for each bulk meter by zone
- Monthly consumption trends with interactive charts
- Performance analysis with key observations and recommendations
- Status monitoring of all meters with flow rates and readings

#### Zone Analysis
- Zone-specific consumption analysis
- Detailed information about each zone's bulk meter and submeters
- Distribution of submeter types within each zone
- Top submeter consumption data and analysis

#### Loss Analysis
- Water loss trends with monthly volumes and percentages
- Zone-specific loss analysis (Stage 01 and Stage 02)
- Loss causes distribution
- Strategic recommendations for loss reduction

### Data Structure

The module uses three primary data sources:
1. **2024 Water Consumption** - Complete annual data for all zones and meters
2. **2025 Water Consumption** - Q1 data for all zones and meters
3. **Water Summary** - Aggregated data from L1, L2, and L3 meters

The data hierarchy follows this structure:
- **L1 (Main Bulk)**: Total water supply to the community
- **L2 (Zone Bulk)**: Water distributed to different zones
- **L3 (Individual Meters)**: Consumption by individual meters in each zone

### Implementation Details

The Water Analysis module is built using:
- React for component architecture
- TypeScript for strong typing
- Recharts for interactive data visualization
- TanStack Query for data fetching and caching
- Supabase for backend data storage
- shadcn/ui for consistent UI components

### Future Enhancements

Planned future enhancements include:
- Real-time monitoring of water consumption
- Predictive analytics for consumption patterns
- Automated anomaly detection in water usage
- Integration with billing systems
- Mobile alerts for unusual consumption patterns
- Water quality monitoring

## Installation and Setup

```sh
# Step 1: Clone the repository
git clone https://github.com/ARahim900/mb-ar.git

# Step 2: Navigate to the project directory
cd mb-ar

# Step 3: Install dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Usage

Navigate to the Water Analysis page through the main dashboard or directly via /water-analysis to access the water management features.

## Contributing

Contributions to the MB-AR project are welcome. Please make sure to update tests as appropriate and follow the project's coding standards.