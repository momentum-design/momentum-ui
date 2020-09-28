const locale = {
  sectionHeaders: {
    elevation: {
      title: 'Elevation',
      body: 'Elevation enables us to create areas of emphasis, priority, and focus throughout our experiences. We use two elevation types: Lower to build a sense of foundation and higher to draw attention to important moments.',
    },
  },
  elevationPurpose: {
    higherElevation: {
      title: 'Higher elevations',
      body: 'Create a focal point that draw focus on particular moments in our experiences like dialogs or pop-overs',
      elevation: 'elevation-4',
      elevationValue: 'drop-shadow(0 24px 48px rgba(0,0,0,0.2)) drop-shadow(0px 1px rgba(0,0,0,0.12))',
    },
    lowerElevation: {
      title: 'Lower elevations',
      body: 'Used to ground and create a sense of foundation and connected-ness such as tiles and cards.',
      elevation: 'elevation-1',
      elevationValue: 'drop-shadow(0 2px 4px rgba(0,0,0,0.16)) drop-shadow(0px 1px rgba(0,0,0,0.18))'
    }
  },
  brightnessMode: {
    dayTime: {
      title: 'Day time (light modes)',
      body: 'Shadows are more perceivable in light modes. This is naturally tied to our physical day time environments',
      mode1: {
        tileColorLabel: 'tile-color: white',
        backgroundColorLabel: 'background-color: gray-05',
        tileColorValue: '#FFFFFF',
        backgroundColorValue: '#F7F7F7',
      },
      mode2: {
        tileColorLabel: 'tile-color: gray-05',
        backgroundColorLabel: 'background-color: gray-10',
        tileColorValue: '#F7F7F7',
        backgroundColorValue: '#EDEDED',
      },
    },
    evening: {
      title: 'Evening (dark modes)',
      body: 'Shadows are less perceivable in dark modes. this is naturally tied to our physical night time environments.',
      mode1: {
        tileColorLabel: 'tile-color: gray-90',
        backgroundColorLabel: 'background-color: gray-95',
        tileColorValue: '#292929',
        backgroundColorValue: '#1C1C1C',
      },
      mode2: {
        tileColorLabel: 'tile-color: gray-95',
        backgroundColorLabel: 'background-color: gray-100',
        tileColorValue: '#1C1C1C',
        backgroundColorValue: '#121212',
      },
    },
  },
}

export default locale;
