"use client";

const BioEditor = ({ bio, setBio }) => {
  return (
    <div className="bg-base-100 rounded-xl p-4 md:p-8">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">
        Tell us who you are
      </h1>

      <div className="md:row-span-2 md:col-start-2 mb-2">
        <fieldset className="fieldset">
          <textarea
            className="textarea md:text-base md:w-[70%]"
            placeholder="Bio"
            value={bio}
            maxLength={500}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <p className="text-xs opacity-60  text-left">{bio.length}/500</p>
        </fieldset>
      </div>
    </div>
  );
};

export default BioEditor;
